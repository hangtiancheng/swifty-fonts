import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/extended.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  external: ["next"],
  tsconfig: "tsconfig.json",
  async onSuccess() {
    const { execSync } = await import("child_process");
    execSync("cp -r src/Swifty dist/");
  },
});
