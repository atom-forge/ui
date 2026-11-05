# Development rules

Shared by every AtomForge package; keep this file identical in all of them (see the root `AGENTS.md`).

Package-specific rules live in the root `AGENTS.md` and, when they need more room, in files under `AGENTS/local/`, which are not shared. Where a package-specific rule is more specific than a shared one, follow the package-specific rule; the shared files only set the common baseline.

- Keep changes focused and consistent with the existing code style. Edit the sources, never generated output such as `dist/`.
- Preserve the public API and its behavior unless a breaking change is explicitly requested. A change that may require action from users is breaking: follow `AGENTS/changelog.md` and the *Upgrading chapter* rules in `AGENTS/documentation.md`.
- Add or update tests for behavior changes. Before finishing, run the test, typecheck, and build commands listed in the root `AGENTS.md`.
- A change to the public API or its behavior is also a documentation change: update the documentation in the same task, following `AGENTS/documentation.md` and the package's documentation model.
- Only commit, push, or publish when asked. Releases use the release and verification commands listed in the root `AGENTS.md`.
