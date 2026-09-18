# Verification

## v0.1.0 preparation — 18 September 2026

Runtime base: `de198aae6a52786406d1eff643cdfca35a2fbdbe` (PRs #3–#5 merged). This preparation changes version and documentation only. The final release SHA must be recorded after merge; it is not the runtime base SHA.

Hosted CI passed for release-preparation commit `8c2e4c8c61fe96396100cf35fa0d754e410b0dc1` before this evidence-only update.

Fresh checks on that base: all 14 portable tests, both portable validators and `tests/render_qml.py --check-only` passed using PySide6 6.11.2. The QML harness checks panel open/reopen/close/Escape, compact horizontal and vertical labels, host theme colours, custom accent, fallback and changing host colours. Host stubs do not execute terminal actions or certify a live desktop.

Additional user-reported live evidence:

- Tom confirmed the remove/reinstall sequence worked and the widget/popover returned.
- Four supplied live desktop screenshots visibly confirm no hook history (cube), running pre-deploy (rocket), recorded local deploy with zero ahead (check-circle), and one subsequent commit (branch). All use a disposable project and synthetic hooks, not a real remote deployment. The fourth unmodified capture is the root preview.
- Tom confirmed permission to submit the plugin and preview artwork.

- Updated the installed plugin and confirmed the compact bar was better. Follow-up `git rev-parse HEAD` output confirms installed Kamal `de198aae6a52786406d1eff643cdfca35a2fbdbe` on Omarchy `4ee6d4eeea176b0bf4014ce8b82a148a9433efff`. Quickshell version remains unrecorded.
- Synthetic failure and incomplete events were exercised. A default-destination failure correctly took priority; after clearing it, a fresh incomplete destination displayed as expected.
- Removed the disposable project from discovery and filtered its synthetic records, retaining a backup; cleanup was confirmed. This was test-data cleanup, not plugin removal.

Remaining before tagging: capture the Quickshell version; validate the final candidate; merge release preparation with green CI and record the immutable release SHA. Terminal staging, real deploy/SSH, actual theme switching, multi-monitor and live vertical layout remain unverified and must not be presented as tested.

Advisory preflight: the skill launcher assumed a sibling directory named `omarchy-plugin-test`, while installed skills use opaque directory names. The same unmodified preflight was run with its validator path resolved to the installed test skill. It reports detector self-matches in `scripts/validate_plugin.py` and historical copies of those findings in `docs/preflight.json` and `docs/security.json`. These files contain diagnostic text, not a Cargo installation step. Findings are retained for review, not suppressed; preflight is not green. Runtime QML process execution and optional hook installation also require review. This is not a security audit.

The original records below are historical; their claims about pending public hosting and absent live testing are superseded by the dated entries. No standalone source-hash manifest for this final candidate has yet been generated.

## Live smoke test — 18 September 2026

Tom tested main commit `3c23dfbe0e49eabac7d69780d84426b91f088c32`
with the two-line `BarWidget.qml` import fix included in this patch:
`import qs.Ui as Ui` and the `Ui.BarWidget` root type.

- Before the fix, the shell reported `Cannot assign to non-existent property "service"`
  at the local panel declaration. The unqualified host import shadowed the plugin's Panel.
- Official `omarchy plugin validate` returned without diagnostics.
- After the fix, Tom confirmed the widget appeared and the panel opened, closed with
  Escape, and reopened.
- A disposable local Git project was discovered. Synthetic pre/post-deploy hook
  commands returned success; the resulting status showed deployed revision `1fac08a2`
  and correctly counted one subsequent commit. The intermediate running display
  was not separately confirmed.
- The same ready status and history survived shell restart and disable/re-enable.
  Widget disappearance during disable was not separately confirmed.

This is user-reported live evidence, not an automated desktop test. The exact
Omarchy/Quickshell versions were not captured. Real deployments, SSH, terminal
staging, update/remove, and monitor/orientation checks remain untested.

The repository is now public and hosted portable CI passed on the above main
commit. The fixture module now exposes a host Panel name so the import collision
is covered, and CI runs the QML fixture check without rewriting preview.png.
Host stubs still do not certify real Quattro integration. No release is claimed.

## Original preparation record — 17 September 2026

The following records the original preparation state; the dated live evidence
above supersedes the public-remote, hosted-CI and specific smoke-test gaps below.

Prepared with Build Omarchy Plugins v0.4.0, commit a12e90568b7e8f28ca7ca92400009758da7eb43b (latest published release checked on this date).

- `./tests/run`: passed model, vendored helper and isolated backend integration tests; both portable validators passed.
- `./demo/run`: passed actual QML loading and open/reopen/close/Escape using PySide6 6.11.2 and explicit host stubs. Process stubs do not execute commands.
- Full toolkit advisory scan: manifest valid. The copied validator flags its own example string as an unpinned Cargo installation. This is detector source, not a runtime install command; retained unmodified for provenance. README package-manager matches describe explicit dependency installation. QML process and hook-setup capabilities require review, not blanket approval.
- Release preflight is not green: the same detector self-match remains, and a public remote is pending. The scan is not a security audit.

Not run: official Omarchy validator, real Quickshell/Hyprland lifecycle and IPC, monitor/orientation behavior, terminal command staging, real deployment/SSH or GitHub integration, fresh remote install/update/remove, hosted CI. These remain release gates. See docs/STATUS.md for inherited feature limits.

Source manifest records exact file hashes. This is an independent development preview, not a published release or marketplace approval.
