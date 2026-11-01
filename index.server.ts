import type { PluginServerContext } from "@getpaseo/plugin/server";

// Our workspace (techno-euphora). Stable label key; amber is the enum's yellow.
const WORKSPACE_ID = "wks_f123ac16ee6858a8";
const LABEL = { name: "\u25C7 Dann", color: "amber" as const };

export default function contribute(server: PluginServerContext) {
  const apply = async (paseo: { setWorkspaceLabel: (opts: unknown) => Promise<unknown> }) => {
    try {
      await paseo.setWorkspaceLabel({ workspaceId: WORKSPACE_ID, label: LABEL, assigned: true });
    } catch (e) {
      console.error("[dann-workspace-accent] setWorkspaceLabel failed:", e);
    }
  };

  // Apply whenever a workspace or agent is created — fires on the next `/baton`, peer agent
  // start, or new worktree, then re-asserts on every future create so it survives reloads.
  server.on("workspace.created", (_event, ctx) => void apply(ctx.paseo as never));
  server.on("agent.created", (_event, ctx) => void apply(ctx.paseo as never));

  return () => {};
}
