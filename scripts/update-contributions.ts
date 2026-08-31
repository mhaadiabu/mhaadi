import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_FILE = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../apps/web/src/data/github-contributions.json',
);
const GITHUB_API_URL = 'https://api.github.com/graphql';
const DEFAULT_USERNAME = 'mhaadiabu';

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

type ContributionSnapshot = {
  username: string;
  total: number;
  fetchedAt: string;
  weeks: ContributionDay[][];
};

type GraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: keyof typeof CONTRIBUTION_LEVELS;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function getArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function getToken() {
  if (process.argv.includes('--token-stdin')) {
    return (await Bun.stdin.text()).trim();
  }

  const argumentToken = getArgument('--token');
  return argumentToken?.trim() || process.env.GITHUB_TOKEN?.trim();
}

function normalizeCalendar(
  username: string,
  calendar: NonNullable<
    NonNullable<GraphqlResponse['data']>['user']
  >['contributionsCollection']['contributionCalendar'],
): Omit<ContributionSnapshot, 'fetchedAt'> {
  return {
    username,
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: CONTRIBUTION_LEVELS[day.contributionLevel],
      })),
    ),
  };
}

function sameContributionData(
  current: ContributionSnapshot,
  next: Omit<ContributionSnapshot, 'fetchedAt'>,
) {
  return (
    current.username === next.username &&
    current.total === next.total &&
    JSON.stringify(current.weeks) === JSON.stringify(next.weeks)
  );
}

async function readExistingSnapshot() {
  try {
    return JSON.parse(
      await readFile(DATA_FILE, 'utf8'),
    ) as ContributionSnapshot;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
}

async function fetchContributions(token: string, username: string) {
  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'user-agent': 'mhaadi.dev-contribution-updater',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: username } }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub GraphQL request failed with ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as GraphqlResponse;
  if (result.errors?.length) {
    throw new Error(
      `GitHub GraphQL request failed: ${result.errors.map((error) => error.message).join('; ')}`,
    );
  }

  const user = result.data?.user;
  if (!user) throw new Error(`GitHub user "${username}" was not found`);

  return normalizeCalendar(
    username,
    user.contributionsCollection.contributionCalendar,
  );
}

async function writeGithubOutput(changed: boolean) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (!outputFile) return;
  await writeFile(outputFile, `changed=${changed}\n`, { flag: 'a' });
}

const token = await getToken();
if (!token) {
  throw new Error(
    'A GitHub token is required. Set GITHUB_TOKEN or pipe one with --token-stdin.',
  );
}

const username = process.env.GITHUB_USERNAME?.trim() || DEFAULT_USERNAME;
const nextData = await fetchContributions(token, username);
const existingData = await readExistingSnapshot();
const changed = !existingData || !sameContributionData(existingData, nextData);

if (changed) {
  const nextSnapshot: ContributionSnapshot = {
    username: nextData.username,
    total: nextData.total,
    fetchedAt: new Date().toISOString(),
    weeks: nextData.weeks,
  };
  await writeFile(DATA_FILE, `${JSON.stringify(nextSnapshot, null, 2)}\n`);
  console.log(`Updated contributions for ${username}.`);
} else {
  console.log(`Contributions for ${username} are unchanged.`);
}

await writeGithubOutput(changed);
