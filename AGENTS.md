# AI Guidelines & Project Context
This file is the canonical project instruction entry point for all AI agents
working in this repository.

The source of truth for architectural guidelines, system rules, commands, and
project structure is located in `work/contribution/`.

**Always read `work/contribution/overview.md` at the start of every session.**

For component discovery, selection, and usage contracts, read
[`README-AI.md`](README-AI.md), then follow its links to the relevant guides and
control documentation. `README-AI.md` serves library consumers; it does not
replace the repository development rules in `work/contribution/`.

## Changelog

Always record every change in `CHANGELOG.md` as part of the same task, including code, documentation, configuration, and agent-instruction changes. A task is not complete until its changelog entry is updated.

- Add entries under `## [Unreleased]` using the appropriate Keep a Changelog category: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, or `Security`.
- Write concise entries in English describing what changed and its impact. Related changes may share one entry; avoid duplicate entries.
- Preserve existing entries and released version sections. Do not bump the version or create a release section unless explicitly asked to prepare or publish a release.
