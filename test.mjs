import { Atlaspack, createWorkerFarm } from "@atlaspack/core";
import wtfnode from "wtfnode";
import path from "path";

async function main() {
    const workerFarm = createWorkerFarm({
        maxConcurrentWorkers: 0,
        useLocalWorker: true,
    });

    const atlaspack = new Atlaspack({
        featureFlags: {
            atlaspackV3: true,
        },
        workerFarm,
        cacheDir: "/tmp/.cache",
        shouldDisableCache: true,
        mode: "production",
        config: "@atlaspack/config-default",
        entries: ["./testfile.js"],
        targets: {
            "default": {
                distDir: "./dist"
            }
        }
    });
    console.log("running");
    const buildResult = await atlaspack.run();
    console.log("getting", buildResult);
    const bundles = await buildResult.bundleGraph.getBundles();
    const bundle = bundles.find((b) => b.type === "js");
    console.log("filepath", bundle.filePath);
}
main().catch((e) => {
    console.error("caught error");
    console.error(e);
    process.exitCode = 1;
});
