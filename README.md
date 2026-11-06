# dann-workspace-accent

Paseo plugin that should tint one fixed workspace (`wks_f123ac16ee6858a8`, "Dann Home") amber and label it "◇ Dann".

## Status: disabled, does nothing

Disabled in `~/.paseo/config.json` on 2026-11-06. Do not re-enable it as is.

1. `index.server.ts` calls `ctx.paseo.setWorkspaceLabel`. That method does not exist on the plugin `PaseoApi`; only the app-side `DaemonClient` has it. The `as never` casts hid this from `tsc`. Every `workspace.created` and `agent.created` hook would throw a TypeError.
2. The CLI has no label command either, so there is no other server-side route.
3. Plugins with a server entry also fail to load when the app is newer than the running daemon (the `hooks` handshake changed between 0.14 and 0.15). That is the original "invalid message: hooks expected object" error. A client-only plugin has no such handshake.

## Plan

Rebuild client-only on `client.setWorkspaceAccent({ workspaceId, color: "amber" })` (colors the header and tab row; returns a registration with `update` and `remove`). It exists only on the unmerged branch `feat/workspace-identity-accent` in `~/src/paseo`. When that ships in a Paseo release:

1. Bump `@getpaseo/plugin` to that release and set `requirements.paseo` to its version.
2. Delete `index.server.ts`; keep only `index.client.tsx`.
3. Guard with `if (typeof client.setWorkspaceAccent !== "function") return () => {};` and the `COMPAT(pluginWorkspaceAccent)` tag.
4. Drop the text label unless `PaseoApi` gains a label method; the accent color replaces it.
5. `paseo plugin enable dann-workspace-accent`, then check the header color in the app.
