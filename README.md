<h1 align="center">Kamal</h1>

<p align="center">
  <a href="https://github.com/tcballard/omarchy-badges"><img src="https://raw.githubusercontent.com/tcballard/omarchy-badges/75975e5b5bf75e7ede3764bcd2950046f7abfe2c/badges/v1/omarchy-plugin.svg" alt="Built for Omarchy: Plugin" height="24"></a>
</p>

**Keep your deployments in the Omarchy bar.**

See the last Kamal deployment recorded by your hooks, how many commits are waiting, and when a run fails. Open the panel to inspect a project or prepare a deploy or rollback, then review the command in your terminal before it runs.

## Everyday use

Add Kamal to your bar and click it to inspect your projects. Set up the optional hooks to record deployment history. Deploy, redeploy and rollback commands are staged in your terminal; pressing **Enter** there runs them. [Setup and controls →](GUIDE.md#use)

## Install

Omarchy Quattro, Node 22+, jq, Git, Bash, Ruby and libnotify. Deployment actions also need your Kamal/Bundler setup and a supported terminal. [Dependencies and hooks →](GUIDE.md#dependencies)

```bash
omarchy plugin add https://github.com/tcballard/omarchy-plugin-kamal.git --enable
```

## Update and remove

Update:

```bash
omarchy plugin update io.github.tcballard.kamal
```

Remove:

```bash
omarchy plugin remove io.github.tcballard.kamal
```

## A few useful details

[Available in the marketplace](https://plugins.omarchy.org/plugin.html?id=io.github.tcballard.kamal). Verification on 20 September 2026 applies to snapshot `59521c0`; later commits are separate. [Review record →](VERIFICATION.md)

The bar reports local deployment history, not a remote health guarantee. Remote polling is optional. Configuration and history survive removal; remove external hook snippets separately. [Behaviour and limits →](GUIDE.md#behavior-and-limits)

[Usage and development guide](GUIDE.md) · [Report a bug](https://github.com/tcballard/omarchy-plugin-kamal/issues)

[Apache-2.0 licensed](LICENSE).

<!-- Preserve links to sections now in the guide. -->
<a id="behavior-and-limits"></a>
<a id="compatibility"></a>
<a id="dependencies"></a>
<a id="remove"></a>
<a id="use"></a>
<a id="verify"></a>

[Looking for the previous detailed sections? Open the full guide →](GUIDE.md)
