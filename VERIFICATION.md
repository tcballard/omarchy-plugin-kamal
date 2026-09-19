# Verification

## v0.1.0 acceptance — 19 September 2026

Tom confirmed: “I tested it. This is v0.1.0”. This records maintainer acceptance for publication. The previously supplied tested source pair was Omarchy `4ee6d4eeea176b0bf4014ce8b82a148a9433efff` and plugin `de198aae6a52786406d1eff643cdfca35a2fbdbe`. The v0.1.0 preparation changes version metadata and documentation only; runtime code and preview are unchanged.

The confirmation does not enumerate additional test cases. The detailed smoke-test observations and unrecorded cases below remain historical evidence, not a claim that each case was independently rerun here. Portable tests and publication validation are rerun for the final candidate.

The old JSON reports in `docs/` are original preparation artifacts, not current marketplace results. Their Cargo findings match detector strings and report text, not an actual Cargo installation path. The current upstream baseline analysis is checked separately and marketplace review remains authoritative.

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
