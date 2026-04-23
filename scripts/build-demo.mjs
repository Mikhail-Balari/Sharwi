import { spawnSync } from "node:child_process"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const env = {
  ...process.env,
  EXPO_BASE_URL: "app",
  EXPO_PUBLIC_DEMO_MODE: "true",
  NODE_PATH: resolve("sharwi-app/node_modules"),
}

const result =
  process.platform === "win32"
    ? spawnSync(
        process.env.ComSpec ?? "cmd.exe",
        [
          "/d",
          "/s",
          "/c",
          "npm exec -- expo export --platform web --output-dir ../public/app",
        ],
        {
          cwd: "sharwi-app",
          env,
          stdio: "inherit",
        }
      )
    : spawnSync(
        "npm",
        ["exec", "--", "expo", "export", "--platform", "web", "--output-dir", "../public/app"],
        {
          cwd: "sharwi-app",
          env,
          stdio: "inherit",
        }
      )

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

const demoDir = resolve("public/app")
for (const entry of readdirSync(demoDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue

  const filePath = join(demoDir, entry.name)
  const routePath =
    entry.name === "index.html" ? "/" : `/${entry.name.replace(/\.html$/, "")}`
  let html = readFileSync(filePath, "utf8")

  html = html
    .replaceAll('src="/_expo/', 'src="/app/_expo/')
    .replaceAll('href="/favicon.ico"', 'href="/app/favicon.ico"')
    .replace(
      "<script type=\"module\">globalThis.__EXPO_ROUTER_HYDRATE__=true;</script>",
      `<script>try{if(location.pathname.startsWith("/app")){history.replaceState(null,"","${routePath}"+location.search+location.hash)}}catch(e){}</script><script type="module">globalThis.__EXPO_ROUTER_HYDRATE__=true;</script>`
    )

  writeFileSync(filePath, html)
}
