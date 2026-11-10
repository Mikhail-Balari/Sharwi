import { readFileSync } from "node:fs";

const path = process.argv[2];
if (!path) {
  console.error("Usage: node scripts/check-agent-review.mjs <review.json>");
  process.exit(2);
}

let data;
try {
  data = JSON.parse(readFileSync(path, "utf8"));
} catch (error) {
  console.error("Reviewer did not produce valid JSON:", String(error));
  process.exit(2);
}

if (
  !data ||
  !["PASS", "FAIL"].includes(data.verdict) ||
  !Array.isArray(data.findings) ||
  !Array.isArray(data.checks)
) {
  console.error("Reviewer result missing required fields.");
  process.exit(2);
}

console.log("Independent review verdict:", data.verdict);
for (const finding of data.findings) console.log("Finding:", finding);
for (const check of data.checks) console.log("Checked:", check);
if (data.verdict !== "PASS") process.exit(1);
