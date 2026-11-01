Assigns an amber "◇ Dann" label to one fixed workspace so it stands out in the sidebar.

The workspace ID is hard-coded in `index.server.ts`, so this plugin only suits the host that owns that workspace. It runs in the daemon, with no app surface: each time a workspace or agent is created, it re-assigns the label. Needs Paseo 0.12.0 or later. Because it has a daemon-side entry, it fails to load if the app was updated but the daemon has not been restarted since.
