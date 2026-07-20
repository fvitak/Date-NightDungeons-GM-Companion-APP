# Blackthorn Companion

A GM companion app for *Rescue of the Blackthorn Clan* — a 2-player "Date
Night Dungeons" D&D 5e romance module by Urban Realms — built for a couple
who's never played D&D before.

It sits next to the **physical book**, not in place of it. It is **not** an
AI Dungeon Master and never narrates or reproduces the book's prose. Its only
jobs:

- Point the GM to exactly **what to read aloud, and when** (page + section).
- Turn the book's terse, D&D-literate instructions into **guided steps with
  the real numbers already filled in** — no memorizing modifiers or looking
  up which check applies.
- Handle the **bookkeeping that's easy to botch by hand**: HP, initiative,
  per-room enemy awareness, reinforcement timing, turn economy.

Combat still uses the book's physical tokens and map — the app tracks state
and walks the GM through resolution, it doesn't replace the table.

**Scope:** Scenario One, "The Old Mill," only (book pages 12–23). Later
scenarios — and a companion view for the non-GM player — are future work.

## Files

| File | What it is |
|---|---|
| `old_mill_gm_companion.html` | The whole app — one self-contained HTML/JS file. |
| `SCENARIO-01-ERRATA.md` | Every place the app deviates from, or fills a gap in, the printed book — and why. |
| `PLAYTEST-FEEDBACK.md` | Full record of a persona-driven playtest round — findings and the decisions made in response. |
| `server.js` | A tiny local test server (no dependencies). |
| `HANDOFF.md` | The full technical handoff — architecture, decisions made, open items. Start here to continue development. |
| `reference/` | Not tracked by git — see `reference/README.md`. |

## Running it locally

```bash
node server.js   # serves http://localhost:8137/
```

Then open `http://localhost:8137/` in a browser. See `HANDOFF.md` §3 for the
syntax-check step to run before every change, and testing notes.

## A note on the book

This repo does not include *Rescue of the Blackthorn Clan* in any form — no
PDF, no page scans, no transcribed text. You'll need your own purchased copy
to play, and to make sense of some of the app's page-number references. See
`reference/README.md` if you want to set up local fact-checking against your
own copy.

## Status

Actively in development, tested locally, not yet published anywhere public
beyond this repo.
