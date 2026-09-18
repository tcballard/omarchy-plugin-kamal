# Kamal v0.1.0 — release draft

First standalone release candidate for the Omarchy Quattro Kamal plugin.
No tag or release has been published yet.

- Compact Kamal label with Nerd Font status glyphs; project details and keyboard controls live in the popover.
- Bar colours follow the host theme, including transparent-bar foreground handling.
- Local hooks track running, completed, failed and incomplete deployments per destination, with deployed revision and Git commits ahead.
- Failures take priority across projects. Missing completion hooks are incomplete, not proof of failure. Recorded local success does not certify remote health.
- Fixed the host Panel import collision that prevented the widget from loading.
- Deploy, rollback and hook setup commands are staged for review in a terminal. Remote polling remains opt-in.

## Evidence and scope

14 portable tests, both portable validators and the headless QML lifecycle/theme checks pass. User-reported live evidence includes project discovery, synthetic hooks, ahead counts, restart persistence, compact bar display, failure/incomplete priority and cleanup. These are local simulations, not real deployments.

Final host revision, candidate validation and remove/reinstall checks are pending. Real deployment, SSH and terminal integration have not been live-tested; multi-monitor/orientation and a real theme switch are also unverified. See VERIFICATION.md for the evidence boundary.

## Requirements and retained files

Node 22+, Git, Bash, jq, Ruby and libnotify; Omarchy Quattro and a Nerd Font with Font Awesome coverage. Deployment actions additionally require Kamal/Bundler, SSH and a supported terminal. See README.md for configuration and commands.

Removal retains user configuration and local state. If optional hook snippets were installed, remove them manually before deleting their targets. No hooks were installed by the disposable live test.
