import { spawnSync } from "node:child_process"

const env = {
  ...process.env,
  EXPO_PUBLIC_DEMO_MODE: "true",
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
