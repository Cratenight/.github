import { fileURLToPath } from "node:url";
import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [codspeedPlugin()],
  resolve: {
    alias: [
      {
        // The app loads the Firebase SDK from the gstatic CDN. Benchmarks run
        // in Node without network access, so route those imports to a stub.
        find: /^https:\/\/www\.gstatic\.com\/firebasejs\/.*$/,
        replacement: fileURLToPath(new URL("./bench/firebase-sdk-stub.js", import.meta.url)),
      },
    ],
  },
  test: {
    benchmark: {
      include: ["bench/**/*.bench.js"],
    },
  },
});
