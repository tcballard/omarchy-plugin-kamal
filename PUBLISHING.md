# v0.1.0 publication preparation

Repository: https://github.com/tcballard/omarchy-plugin-kamal

Plugin ID: `io.github.tcballard.kamal`. Candidate manifest version: `0.1.0`.
No release tag, GitHub release or marketplace issue has been created by this preparation.

## Remaining release steps

1. Record the exact live Omarchy, Quickshell and installed plugin revisions; removal and reinstallation have been confirmed. Preserve user config and state.
2. Resolve or explicitly review the advisory preflight findings in VERIFICATION.md. They are not a clean security result.
3. Complete release preparation, merge with green CI, and record final full SHA. Confirm main has not moved.
4. Create immutable annotated `v0.1.0` at that SHA, prepare source/checksum/provenance assets, and verify the downloaded draft release assets before publication.
5. Replace pending evidence in the issue draft below. Obtain owner confirmation of its five checklist statements, including rights to code and preview assets, before submitting.

Destination and form checked on 18 September 2026 against `omacom/omarchy-plugin-marketplace` main `d1a6cc05e54f5f294d42c0e744a17e20b6c756d4`. Exact-repository and plugin-ID issue searches found no existing request. Recheck before creation. Submission starts review; listing requires marketplace maintainer approval for the exact commit.

The social card is `assets/github-social-preview.png`; adding it to the repository does not configure GitHub social-preview settings.

## Prepared issue title

[Plugin]: Kamal

## Prepared issue body — pending final evidence and owner attestations

### Repository URL

https://github.com/tcballard/omarchy-plugin-kamal

### Category

Developer Tools

### Tags

Quickshell, Bar

### Suggest a missing tag

_No response_

### Maintainer notes

Kamal is a local-hook deployment tracker for Omarchy Quattro. The compact bar opens a native project popover. Requires Node 22+, Git, Bash, jq, Ruby and libnotify, plus a Nerd Font with Font Awesome coverage. Kamal/Bundler, SSH and a supported terminal are needed for deployment actions. Default collection reads local repositories and hook events without network access; optional SSH polling and explicitly staged terminal actions contact configured hosts. State stays in the user state directory. Hook setup is explicit, appends with backups, and leaves optional hooks for manual removal. The preview is a real desktop screenshot supplied by the owner, with a disposable project and simulated local hook events. Portable tests and QML fixture checks pass; local synthetic-hook and bar testing was reported on a live desktop. The live host revision and successful remove/reinstall are recorded in VERIFICATION.md; the final release SHA will be added before submission. Advisory detector self-matches and runtime process/hook capabilities remain disclosed in VERIFICATION.md; checks are not a security audit.

### Submission checklist

- [ ] The repository is public and contains installation and removal instructions.
- [ ] I have documented the plugin license and any external dependencies.
- [ ] I confirm that I own or have permission to submit this plugin and its preview assets.
- [ ] The plugin does not overwrite user configuration without explicit consent.
- [ ] I understand that approval is for listing and is not a security review.
