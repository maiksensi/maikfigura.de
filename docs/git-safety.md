# Git Safety Harness

This harness governs git operations. Keep it separate from the testing guide so repository
safety rules are findable and not hidden in test documentation.

## Non-negotiable force-push rule

- Never force push by default.
- Do not decide to force push independently under any circumstance.
- Before even asking the user about a force push, exhaust and explain safer alternatives such
  as a normal push, pull/rebase with conflict resolution, a new branch, a revert, or a
  follow-up commit.
- Only if every safer alternative has been considered and rejected may you ask the user for
  explicit force-push approval.

## Git safety sensor

The git safety sensor is currently a required manual check, not a repository hook. Before
staging, committing, pushing, rebasing, or running any destructive git command, inspect:

```bash
git status --short --branch
git diff --stat
git diff --staged --stat
```

The sensor passes only when:

- The current branch and upstream relationship are understood.
- Only intended files are staged.
- Generated local artifacts remain untracked unless the user explicitly requested them.
- The commit split matches the change concerns.
- The planned push is a normal push.

If a normal push is rejected, stop and choose a safer alternative before any force-push
discussion.

## Safer alternatives before force-push

Use these before considering any history rewrite on a remote branch:

- Pull or rebase from the remote and resolve conflicts.
- Push to a new branch and open a pull request.
- Add a follow-up commit that corrects the previous one.
- Revert with `git revert` instead of rewriting published history.
- Ask the user to choose between remaining non-rewriting options.

Only after every safer alternative has been considered and rejected may you ask a force-push
question. That question must name the exact branch, exact command, risk, and rejected
alternatives.
