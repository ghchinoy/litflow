# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Stability & Quality Checklist

Before completing a feature or bug fix, ensure the following:

1. **Build Check:** Always run `pnpm run build` to verify TypeScript types and compilation.
2. **Auto-Layout Verification:** Check `examples/auto-layout/index.html`. Nodes should not stack at (0,0) and should slide smoothly into position.
3. **Designer Stability:** Check `examples/designer/resizer.html`. Ensure toolbars are only visible on selection and node resizing works without visual lag.
4. **Browser Compatibility:** If you created or modified an example in raw HTML, ensure it does not use TypeScript decorators or syntax requiring a build step in the `<script>` tag.

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

