import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { FileSystemStateStore } from "alchemy/state";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("mhaadi", {
  stateStore: (scope) => new FileSystemStateStore(scope),
});

const REDIRECT_SCRIPT = `
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "mhaadi.mhaadi.workers.dev") {
      return Response.redirect("https://mhaadi.dev", 301);
    }
    return env.ASSETS.fetch(request);
  }
};
`;

export const web = await Vite("web", {
  name: "mhaadi",
  adopt: true,
  cwd: "../../apps/web",
  assets: {
    directory: "dist",
    run_worker_first: true,
  },
  script: REDIRECT_SCRIPT,
  bindings: process.env.PUBLIC_SERVER_URL
    ? {
        PUBLIC_SERVER_URL: process.env.PUBLIC_SERVER_URL,
      }
    : {},
  build: {
    command: "bun run build",
  },
  dev: {
    command: "bun run dev:bare -- --host 0.0.0.0 --port 4321",
    domain: "localhost:4321",
  },
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
