import { execFileSync } from "node:child_process";

const changed = execFileSync("git", ["diff", "--name-only", "-z", "--"], {
  encoding: "utf8",
}).split("\0").filter(Boolean);

const blocked = changed.filter((path) =>
  path.startsWith(".github/") ||
  path.startsWith("ops/") ||
  path === "AGENTS.md" ||
  path.endsWith("/AGENTS.md") ||
  path === "scripts/agent-guard.mjs" ||
  path === "scripts/check-agent-review.mjs" ||
  path === "vercel.json" ||
  /(^|\/)\.env(\.|$)/.test(path) ||
  /\.(pem|key|p12|pfx)$/i.test(path)
);

if (blocked.length) {
  console.error("Autonomous run attempted to edit protected paths:");
  blocked.forEach((path) => console.error(` - ${path}`));
  process.exit(1);
}

console.log(`Allowed changed paths: ${changed.length}`);
if (!changed.length) process.exit(2);
