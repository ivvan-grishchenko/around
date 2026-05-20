# Domain Docs

## Layout

**Single-context.** This repo has one global context.

- `CONTEXT.md` at the repo root — project domain language, architecture overview, key terminology, tech stack, and conventions.
- `docs/adr/` at the repo root — Architecture Decision Records. Each ADR is a markdown file numbered sequentially (e.g. `0001-use-postgres.md`).

## Consumer rules

Skills that read domain docs (`improve-codebase-architecture`, `diagnose`, `tdd`, `zoom-out`) follow these rules:

1. **Always read `CONTEXT.md` first** before making architectural suggestions, diagnosing bugs, or writing code. This file contains the project's domain language and constraints.
2. **Check `docs/adr/` for past decisions** before proposing changes that might conflict with an existing ADR.
3. **If `CONTEXT.md` doesn't exist yet**, the skill should note that and proceed with reasonable defaults, flagging that a context doc would help.
4. **If `CONTEXT.md` is stale**, the skill should flag specific sections that appear out of date rather than silently ignoring them.

## Creating these docs

If `CONTEXT.md` or `docs/adr/` don't exist yet, create them when the first skill needs them. A minimal `CONTEXT.md` should cover:
- What this project does (one paragraph)
- Tech stack
- Key domain terms and their definitions
- Architecture overview (high-level)
- Coding conventions
