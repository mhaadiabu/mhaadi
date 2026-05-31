import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("mhaadi", { stage: "prod" });

export const web = await Vite("web", {
  name: "mhaadi",
  adopt: true,
  cwd: "../../apps/web",
  assets: "dist",
  bindings: {
    PUBLIC_SERVER_URL: alchemy.env.PUBLIC_SERVER_URL!,
  },
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
