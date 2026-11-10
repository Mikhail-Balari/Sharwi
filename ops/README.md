# Sharwi Autonomy — operator guide

## Current delivery
This folder defines the instructions used by Codex, and two GitHub Actions workflows:
- `.github/workflows/sharwi-ci.yml`: deterministic build/typecheck gates for PRs.
- `.github/workflows/sharwi-autonomous.yml`: a **disabled-by-default** scheduled/manual Codex coding loop. It writes a patch in a read-only GitHub token job, tests the patch in a separate job without an API key, runs an independent Codex review, and commits a verified patch to isolated **`agent/staging`**. It opens one accumulating **draft release PR** into `main`. It **never merges** to `main` or deploys production.

Files `ops/agents/*.md` describe specialist roles. The root and scoped `AGENTS.md` files are automatically recognized by Codex; specialist role markdown files must be explicitly loaded/delegated by a capable orchestration runtime. Merely adding markdown does not create permanently running agents.

## Activate after the setup PR is merged
1. In **GitHub repository > Settings > Secrets and variables > Actions**, add a secret named `OPENAI_API_KEY` from a dedicated OpenAI API project with a budget/spend limit. **API use costs extra and is not included in the ChatGPT subscription**. Do not paste the key into chat, code or issue bodies.
2. In **Variables**, add `SHARWI_AUTONOMY_ENABLED=true`. Leave absent/false until you authorize recurring API charges.
3. Confirm **Settings > Actions > General** allows workflows and pull-request creation from `GITHUB_TOKEN`. If your GitHub setting prevents bot PRs, enable it there.
4. Under **Actions**, manually run `Sharwi Autonomous Iteration` once, check job/test/review output, the new staging commit and the accumulating draft release PR. Only after verifying cost, permissions and CI should you leave recurrence enabled.
5. Protect the `main` branch and require CI / human review; prevent direct push and force push. Vercel should deploy production only from protected `main`. Treat preview deployments as non-production; do not expose secrets in untrusted PRs.
6. Add a durable backend Postgres service, secrets and deployment only after evaluating the actual environment and cost. Do not use development DB credentials in production.

## Scheduling and costs
The workflow checks `vars.SHARWI_AUTONOMY_ENABLED` and has a 6-hour cron. Github cron is best-effort; it is not a guarantee of on-time execution. Each run has one bounded implementation plus independent QA and a capped GitHub Actions timeout, but **no hard model-token cost cap is enforced by this repository**. Use OpenAI project budgets and disable the variable to stop new runs. Runs do not re-trigger just because prior PRs remain open.

## How the loop behaves
`agent/staging` -> autonomous Codex makes one bounded patch -> denylist check -> patch artifact -> `npm ci` and 3 build gates -> separate Codex reviewer verdict -> commit to `agent/staging` -> open/update the draft release PR to `main`. The next scheduled run reads **updated staging** and starts the next eligible slice without waiting for a founder merge. The loop stops on a failed QA gate instead of deploying anyway. Production remains protected.

## What is still missing
- The `OPENAI_API_KEY` secret and `SHARWI_AUTONOMY_ENABLED` variable are not set by adding these files.
- Backend persistence/deployment and app distribution have not been verified.
- Multi-agent delegation in Codex Cloud/Agents API requires enabling it at runtime. The GitHub Action coding step is a single Codex execution; independent review is a second agent execution.
- Autonomous commits to isolated `agent/staging` are allowed **only after independent review and CI**; merging into protected `main` is intentionally prohibited because Vercel deploys `main` to production.

## Stop switch
Remove or set `SHARWI_AUTONOMY_ENABLED=false` to prevent new scheduled runs. Cancel running jobs under Actions. Revoke the OpenAI API key if there is any indication of compromise. No third-party keys belong in repo files.
