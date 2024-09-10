const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules__pnpm_51adc1._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/.pnpm/next@14.2.3_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
