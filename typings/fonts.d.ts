// Wrangler's Data rules (see wrangler.toml) import .woff2 files as ArrayBuffer.
declare module '*.woff2' {
    const data: ArrayBuffer;
    export default data;
}
