# Skills Hub Node workflow pins — 2026-10-24

Base: `26c0f0b3ba3694893fbfca0aed496a63b162e9e1` on `main`.

## Change and canonical path

- `.github/workflows/ci.yml:43`: single build runtime `lts/*` → `22.23.4`.
- `.github/workflows/publish-npm.yml:22`: publisher `20` → `22.23.4`.

Both retain the existing `actions/setup-node@v4` path. Pinning CI alongside
the publisher makes the normal PR's existing build/tests exercise the same
selected Node runtime as a later approved publication. This is not a support
matrix change; package version, tests, dependencies and application code stay
unchanged.

## Native route and release boundary

`ci.yml:6-11` runs on PRs targeting main and existing push/manual events.
Its existing install, tests and catalog build remain at46/53/56. Main-only
credential/auto-sync guards at59/66 are unchanged; a future approved main push
can still commit generated registry drift at79-80.

The npm publisher remains release-published/manual only
(`publish-npm.yml:8-11`); no PR or ordinary-main publication trigger is added.
The release workflow remains v*-tag-only. No workflow activation, manual
dispatch, tag, publication, merge, deploy or runtime/restart action is authorized.

## Verification and limits

Applicable local check: `git diff --check` exits0; literal diff review verifies only
the two selected values changed in the workflows. No local install/full suite,
new test, harness, qualification layer or backup was added.

Before this PR, read-only fork APIs exposed Actions permission enabled=true,
but registered workflow/run lists were empty and the named CI run route
returned404. Only this PR's normal native event may qualify the candidate.
If no run/check appears, the candidate is blocked; that does not authorize
workflow enabling, dispatch, rerun, settings changes or a replacement CI.
No application/security-clearance or published-runtime claim follows from
workflow source alone.

Status: source candidate, not merged or published. Future merge/publication
requires separate approval. Rollback: revert the eventual actual merge through
an approved source PR, restoring publisher20 and CI lts/* selectors. No runtime
or publication rollback qualification performed.
