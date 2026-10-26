# Skills Hub security and deterministic catalog generation

Base: `26c0f0b3ba3694893fbfca0aed496a63b162e9e1` on `main`.

## Change and canonical path

- `.github/workflows/ci.yml:43`: single build runtime `lts/*` → `22.23.4`.
- `.github/workflows/publish-npm.yml:22`: publisher `20` → `22.23.4`.

Both retain the existing `actions/setup-node@v4` path. Compatible YAML
development dependency moves from `^2.8.2` to `^2.9.1`.

The generated-file guard failed because every catalog invocation assigned the
wall clock at `scripts/build-catalog.js:322`, propagating it to four tracked
outputs. Committing regenerated timestamps alone would fail on the next run.
The generator now retains the previous timestamp when catalog content is
unchanged; changed content still gets a fresh timestamp. Guard unchanged.
Canonical reference: https://reproducible-builds.org/docs/timestamps/ .

## Native route and release boundary

`ci.yml:6-11` runs on PRs targeting main and existing push/manual events.
Its existing install, tests and catalog build remain at46/53/56. Main-only
credential/auto-sync guards at59/66 are unchanged; a future approved main push
can still commit generated registry drift at79-80.

The npm publisher remains release-published/manual only
(`publish-npm.yml:8-11`); no PR or ordinary-main publication trigger is added.
The release workflow remains v*-tag-only. Operator's October 26 resume grants
normal merge with rollback by reverting the actual merge to the base above.
No publication under the upstream package identity, tags, settings, secrets
or runtime restarts. This source/build change creates no application image.

## Verification and limits

The regression ran RED before implementation:
`AssertionError: unchanged content keeps its generation time`, actual
`2026-10-26T00:25:54.322Z`, expected `2026-10-26T00:25:54.179Z`.
After correction it passes, checking byte-identical outputs on repeat builds
and fresh timestamps for changed content. No tests removed. Local audit after
the YAML update reports zero vulnerabilities. Native CI retains full validation,
tests, generation and the unchanged drift guard.
Logs: `.claude/artifacts/node-sec-node-pins/` in the canonical checkout.

The normal PR event now runs native CI. Fork Pages API absence alone does not
prove the repository was never live. No published-runtime or portfolio-wide
security-clearance claim follows from build-tooling source alone.

Status: source candidate until normal merge and green postmerge CI.
Rollback: revert the actual merge; no publication performed.
