import type { PluginClientContext } from "@getpaseo/plugin/client";

// The workspace accent (amber "◇ Dann" label) is applied server-side; no client surface needed.
export default function contribute(_client: PluginClientContext) {
  return () => {};
}
