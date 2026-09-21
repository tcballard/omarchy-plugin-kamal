# Kamal preparation status

Independent repository extracted on 17 September 2026; v0.1.0 accepted by the maintainer on 19 September 2026.

Kamal was [listed and snapshot-verified in the Omarchy Plugin Marketplace](https://plugins.omarchy.org/plugin.html?id=io.github.tcballard.kamal) on 20 September 2026 at commit [`59521c0`](https://github.com/tcballard/omarchy-plugin-kamal/commit/59521c064e8b6aa0dae9f05df3cda01b476c2b50). Verification applies to that snapshot only; see [publication scope](../PUBLISHING.md).

| Plugin | Implemented | Outstanding |
|---|---|---|
| Kamal | Local hook journal; destinations; deployed SHA and ahead count; rollback history; staged deploy/redeploy/rollback/logs/audit/version; real failure wrapper; sticky failure acknowledgement; opt-in throttled SSH text snapshots; idempotent shell-hook append with backups | Evaluated deploy.yml ERB/aliases; rich host progress; destination picker; safe integration with arbitrary non-shell/custom-path hooks |

Public source repository: https://github.com/tcballard/omarchy-plugin-kamal. See PUBLISHING.md for publication scope. Official validation and a local live smoke test are recorded in VERIFICATION.md. Additional test-case details for real deployment/SSH, terminal staging, update/removal and monitor/orientation were not supplied with the v0.1.0 acceptance.
