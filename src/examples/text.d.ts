// The `*.text` files under src/examples are imported as plain strings, see textFilesPlugin in docusaurus.config.ts.
declare module '*.text' {
  const content: string;
  export default content;
}
