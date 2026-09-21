# Kamal v0.1.0

Your deployments, in view.

Follow local Kamal hook activity from the Omarchy bar, see the last deployed revision and commits ahead, and review deploy, redeploy or rollback commands in your terminal before running them.

- Native bar widget and searchable project panel.
- Per-destination hook history, recorded failures and acknowledgement.
- Explicit hook setup with backups; remote polling is opt-in.
- Independent plugin with no sibling stack checkout required.

Tested and accepted by Tom on Omarchy Quattro. See VERIFICATION.md for the recorded environment and detailed test scope. The preview uses labelled fixture data. Local hook status does not certify remote health; ERB, YAML aliases and custom hook placement retain the documented limitations.

## Marketplace availability update — 20 September 2026

Kamal was [listed and snapshot-verified in the Omarchy Plugin Marketplace](https://plugins.omarchy.org/plugin.html?id=io.github.tcballard.kamal) on 20 September 2026 at commit [`59521c0`](https://github.com/tcballard/omarchy-plugin-kamal/commit/59521c064e8b6aa0dae9f05df3cda01b476c2b50).

Verification applies only to that reviewed snapshot. Installation and update commands follow upstream HEAD, which can include later, unreviewed commits; marketplace verification is not a security audit, certification or guarantee.

Install on Omarchy Quattro after reviewing the [dependencies and setup](README.md#dependencies):

```sh
omarchy plugin add https://github.com/tcballard/omarchy-plugin-kamal.git
omarchy plugin enable io.github.tcballard.kamal
```

Then add Kamal’s widget to the bar.
