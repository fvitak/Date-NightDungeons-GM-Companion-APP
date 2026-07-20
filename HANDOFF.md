# Blackthorn Companion — project handoff

A working reference for continuing this project in a fresh thread. Read this
first, then open the mockup and the errata doc in this same folder. If a
design or table-craft question is live, also read `PLAYTEST-FEEDBACK.md` —
several of the decisions below were pressure-tested or reversed once, and
that doc has the reasoning, not just the outcome.

---

## 1. What this is

A **companion app** that sits next to the physical book *Rescue of the
Blackthorn Clan* (a 2-player "Date Night Dungeons" D&D 5e romance module) and
removes friction for a couple who may never have played D&D. It is **not** an AI
Dungeon Master and does **not** narrate the story — the players read narration
from the book. The app's only jobs:

- Point the GM to exactly **what to read and when** (page + section — never
  reproduces the book's prose).
- Turn the book's terse, D&D-literate instructions into **crystal-clear guided
  steps with the real numbers filled in**, so no one has to memorize stats,
  modifiers, or which check applies.
- Handle the **bookkeeping that's easy to botch by hand** (HP, initiative order,
  per-room awareness, reinforcement timing, the romance "Attraction Points"
  layer).

Combat still uses the book's **physical tokens and maps** — the app does not
replace them; it tracks state and walks the GM through resolution.

**Format the book actually uses (important):** it's a *rotating single-GM*
game. For a given scenario, one partner is GM (reads DM notes, voices NPCs,
adjudicates, and — in Scenario One — plays the captured character Wynn) while the
other plays their character (Tarric + his wolf Briar). The GM role flips per
scenario. The app is built around this, and the "who plays whom" grouping is
data-driven so it can flip.

**Scope right now:** only **Scenario One, "The Old Mill"** (book pages 12–23).

---

## 2. Files in this folder

| File | What it is |
|---|---|
| `old_mill_gm_companion.html` | The mockup — a single self-contained HTML/JS file. This is the whole app. |
| `SCENARIO-01-ERRATA.md` | The "book differences & house rules" record (also surfaced in-app). |
| `PLAYTEST-FEEDBACK.md` | Full record of the persona stress-test round — what each reviewer found, and Frank's decisions, with reasoning. |
| `server.js` | A tiny local test server (see §3). |
| `HANDOFF.md` | This file. |
| `README.md` | The GitHub-facing landing page (short, human-oriented — this file is the deep one). |
| `reference/` | The source book PDF + a text extract — **not tracked by git** (copyrighted; see `reference/README.md`). Empty on a fresh clone. |

The source book PDF belongs at `reference/DriveThruPDFRescue5E.pdf`. Book page
N = PDF page N+1. Render a specific page to check a fact with `pdftoppm`
(poppler is installed via winget: `oschwartz10612.Poppler`), e.g.:
```
pdftoppm -f 16 -l 16 -png -r 150 reference/DriveThruPDFRescue5E.pdf page
```

> This project started life alongside the GRAIL AI-DM app (`SpringRidgeDnD`
> repo) but is a **separate, deliberately simpler** direction and shares no
> code with it. `reference/RescuePDFExtract.md` is handy for a quick
> full-text search to locate a page number, but has known transcription
> errors — **always verify the actual rule against a rendered PDF page
> image, not that extract's wording.**

---

## 3. How to run and test it (do this — don't work blind)

The single biggest lesson from the last session: **don't reason about the UI
blindly — run it and drive it.** Two guardrails, use both:

**a) Syntax-check before every publish** (catches the class of bug that shipped
a blank page twice):
```bash
cd <this folder>
awk '/<script>/{flag=1;next}/<\/script>/{flag=0}flag' old_mill_gm_companion.html > _extracted.js
node --check _extracted.js && echo "SYNTAX OK" || echo "SYNTAX ERROR"
rm -f _extracted.js
```

**b) Run it locally and drive it in the browser pane:**
```bash
cd <this folder>
node server.js   # serves http://localhost:8137/  (run in background)
```
Then `preview_start` the URL `http://localhost:8137/` and interact. Notes:
- The **browser pane's screenshot tool times out** in this environment — use
  `get_page_text`, `read_page`, and especially `javascript_tool` to inspect and
  drive. Clicking real buttons by `ref` was flaky; the reliable path is
  `javascript_tool` calls that `.click()` elements and read back state.
- `javascript_tool` runs in a scope where re-declaring `const` names collides —
  wrap snippets in `(() => { ... })()`.
- The server **intentionally provides only a bare charset + reset**, mirroring
  what the Artifact runtime gives. It does **not** inject design tokens. This is
  on purpose: the page must be self-sufficient, so local testing catches missing
  CSS instead of hiding it.

**Source of truth: GitHub.** The repo is
`https://github.com/fvitak/Date-NightDungeons-GM-Companion-APP` (`main`
branch). Work in this local folder, commit, and push there — that's the
canonical copy now, not the Artifact below. Standard git workflow applies:
commit only when asked, never force-push, confirm before pushing unless
already mid-session on an explicitly-authorized push. The `reference/`
folder never gets committed (see §2) — check `git status --ignored` if
unsure before staging.

**Publishing (Artifact, secondary — currently stale):** the app was also
published as a private Artifact at
`https://claude.ai/code/artifact/0a4e9b38-6fc6-499e-a710-fc4ee41eaa2e`
(label `old-mill-gm-companion-v16-combat-console`), but **this has not been
re-published since the GitHub repo was set up** — assume it's behind the
`main` branch until confirmed otherwise. To keep the same URL when
re-publishing, pass that URL as `url`; otherwise a new URL is minted. The
browser pane **cannot** load the private artifact URL (no auth) — that's why
the local server exists for testing.

**Critical styling fact:** the Artifact runtime provides only a minimal CSS
reset — **NOT** design-system tokens. The page therefore defines all its own
tokens (`--surface-*`, `--text-*`, etc.) for light AND dark mode in its `<style>`
block, plus `.sr-only`, base `body`, and form-control styling. Keep it that way.

---

## 4. Current state — what's built and verified

Everything below was **driven in the browser and confirmed working** last
session unless marked otherwise.

**Exploration (all modal-driven — `#detail` was retired)**
- **Location graph** (not tabs, not a single pointer): "you are here" + an
  action grid showing only the doors/windows the current room actually has,
  sourced from the book's "Points of Entry." `look` actions (peek in a window)
  show a "Read: … page N" pointer and do NOT change location; `enter` actions
  move you and resolve any required check first.
- **Read pointers**: moving into a room surfaces "Read: <room> description —
  page N". The app never reproduces prose.
- **Every exploration resolution opens as a dismissable modal** (✕ / ESC /
  scrim-click), via `flowModal()`. Combat modals stay non-dismissable on
  purpose (no ✕, ESC ignored) so a fight can't be swiped away mid-resolution.
- **Guided checks** with the real character modifiers filled in (Tarric
  Athletics +3 / Stealth +4 / Str +3 / Shortbow +4 1d6+2; Wynn Dex +2 — pulled
  from the actual character-sheet pages 61 & 67), using the shared
  `rollFieldsHtml`/`wireNat`/`readRoll` nat-1/20 auto-resolve helpers. Player
  enters the **total** (they add the modifier out loud); nat-1/20 skip the
  number entirely. All fumble consequences (paddlewheel/roof falls, the window
  stream-splash) are preserved through the auto-resolve.
- **Term-first tooltips**: "roll an Athletics check against DC 10" with a
  tap-ⓘ that explains the mechanic + the real modifier. Tap-to-reveal (no
  hover — it's a phone/tablet).
- **Room 1 window** correctly resolves as **two** ordered checks (DC 10 Athletics
  to fit through, then −4 Stealth vs Arnie's passive Perception 9).
- **Shoot-the-lookout** gets the real RAW attack treatment (nat-20 = crit, roll
  damage twice). A **clean drop starts NO combat by itself** — it opens a
  per-room noise-check (tick the rooms that notice, correct book DCs for that
  branch); only a noticed room joins the fight. A **survived shout** always
  engages Harold on the roof immediately, then offers the same noise-check for
  the other rooms with the shout DCs. (Fixed a bug where any hit force-started
  an empty fight, and where the shout branch used the wrong/backwards DCs —
  see errata #1/#5.)
- **Off-menu fallback** ("something else?") with a ruling scaffold
  (move / rough-DC attempt / just-describe).
- **"Book differences" panel** listing the genuine book contradictions & gaps
  the app takes a side on (see `SCENARIO-01-ERRATA.md`).
- **Present-here grouping**: "your party — player runs" (Tarric, Briar), "GM
  plays" (Wynn, appears only where she physically is), "threats here" —
  tapping a chip opens an **inline** (not modal) reference panel; this is
  reference info consulted alongside an action, not a resolution.
- **Walking into an occupied room openly triggers a confrontation** (the enemies
  see you → combat starts), instead of silently moving.
- **The manual "a fight broke out" button** only appears when the current room
  actually has a living, unengaged threat (fixed the same empty-combat bug for
  this edge path); otherwise it shows "no threats here to fight."

**Combat (all modal-driven)**
- **Only aware enemies are in the fight.** Enemies are gated by per-room alert
  state (`zoneAlert`) — walk into Room 2 and only Willard + Agatha are engaged;
  Harold (roof) and Arnie (room 1) stay out until they hear it.
- **Modal initiative sequence**: one combatant at a time ("Ask Tarric to roll
  for initiative", details in tooltip), rolled totals set the turn order. Has
  a back button that pre-fills the prior value.
- **Loud-noise modal**: relevant rooms only (e.g. a Room 2 fight → Room 1 DC 7
  and roof DC 7), tick the ones that hear → they join and roll initiative. Now
  **re-runs each round** for still-unaware rooms via the round gate. (Roof's
  ongoing-noise DCs were fixed to the "shout" numbers 6/10 — a dead lookout
  makes no ongoing noise, so roof only ever propagates noise while Harold is
  alive and fighting.)
- **Turn economy**: a persistent "① move if they want · ② one action · ③ end
  turn" rail teaches the shape of a 5e turn. An `actionUsed` flag greys out
  further attacks/casts after one action ("action already used — one per
  turn") instead of allowing infinite actions. Agatha's True Strike is a real
  two-turn play (primes "aim" turn 1, advantage-flagged attack turn 2). Briar's
  Bite shows its "DC 11 Str save or prone" rider on a hit.
- **Per-turn action console modal**: shows the character's options; GM-run
  turns (enemies + Wynn) pulse for attention, player turns are quieter but still
  show their attacks so the GM can record damage. **Unavailable actions are
  struck through with a reason** (e.g. Wynn's staff swing "can't right now —
  hands still chained", or "action already used — one per turn").
- **In-modal attack resolution**: pick attack → pick target → roll to-hit
  (vs target AC) → damage → applied to the tracker, all without leaving the
  modal. Every step has a back button. The shared chain
  (`attackTarget`/`attackToHit`/`attackDamage`/`attackResult`) takes an
  optional `onResolved` callback — when present it's a **free attack outside
  the normal turn loop** (no "end turn" chrome, no action-economy side
  effects); this is what powers reinforcement free attacks (below).
- **Nat-1/nat-20 auto-resolve**: ticking natural 20 = automatic success/hit
  (and flags a crit), natural 1 = automatic fail — the total field disappears,
  no number needed. Reusable via `rollFieldsHtml` / `wireNat` / `readRoll`.
  Checkboxes are each their own `<label>` (a shared label was mis-associating
  near-miss taps) with 18px hit targets.
- **Wynn's gag** is her per-round turn action: roll DC 18 while gagged. House
  rule (logged in errata): a **success** frees the gag AND still lets her act
  that turn (verbal-only spell, hands still chained); a **failure** costs her
  action for the turn. (Strict RAW would cost the action either way — DC 18 is
  near-Hard for her and she's still hands-chained even on success, so paying
  the action cost twice felt like double-punishing the rescue's emotional
  beat. Re-litigate if it feels off in play.)
- **A downed party member gets a coaching banner**, not silence: standard 5e
  death-save rules (roll d20 no modifier each turn, 10+ succeeds, 3
  successes/failures, nat 20 heals 1 HP and wakes them, damage while down is
  an auto-fail). The app doesn't roll these for you — real dice, same as
  attacks — it just teaches the rule at the one moment a novice GM would
  otherwise freeze.
- **Reinforcement modal**: when the inside ruffians' combined HP ≤ 10, fires at
  end of turn (or from an attack result). Shows the **lookout Harold's status**
  (down / alive-and-alerted / alive-but-oblivious) — a live, roof-alerted
  lookout auto-warns the returners with no roll (book p.15: he shouts and
  stomps), otherwise the book's DC 8 (fight ongoing) / DC 10 (fight over)
  applies. A two-sided "who gets the drop" flow follows (ruffians' notice, then
  party's notice) and **free attacks are now resolved in-modal, attacker by
  attacker**, using the same attack chain as combat, before rolling the three
  newcomers' initiative. Every step has a back button; nothing is committed
  until the final "roll initiative" click. **Verified end-to-end, both
  directions** (reinforcements-attack-party and party-attacks-reinforcements).

**Attraction Points**
- The app does **not** track, prompt, or remind about AP at all — this was a
  deliberate removal (see §6/§7). It's entirely on the paper character sheets,
  player-driven, per the book.

**Styling**
- Self-contained design tokens for **light and dark** mode; `.sr-only` hidden;
  modal is a proper centered card over a dimmed backdrop. Exploration modals
  use a lighter scrim (0.28 vs combat's 0.45) and are dismissable; combat
  modals are not.

---

## 5. Architecture cheatsheet (all in the one HTML file)

- **State**: `currentLoc`, `combatActive`, `round`, `currentTurnId`,
  `actionUsed` (current combatant's one-action-per-turn flag), `zoneAlert
  {roof,room1,room2}`, `wynnFreed`, `hasKey`, `wynnGagged()` (from Wynn's
  `notes`), `reinforcementsPending`, `reinforcementsResolved`, `loudCheckedRound`.
- **Data**: `LOCATIONS` (graph: `looks`, `enters`, `local`, `read`, `threats`),
  `COMBATANTS` + `REINFORCEMENTS` (each has `attacks[]` — an attack can carry a
  `rider` string, e.g. Briar's trip — `zone`, `init` mod, `initRoll` set at
  runtime, `ac`, `hp`, `notes`), `PARTY` (character-sheet modifiers + tooltip
  text), `ERRATA` (book-differences list, 6 entries).
- **Roll helpers**: `rollFieldsHtml(pfx, allowNat20, natExtra)` + `wireNat(pfx)`
  + `readRoll(pfx, target)` — the reusable nat-auto roll entry, used by both
  exploration checks and combat attacks. `NAT_EXTRA_ATTACK` vs `NAT_EXTRA_CHECK`
  pick the right tooltip wording (attacks get the real RAW rule; checks are
  framed as a no-math shortcut, not a law). Each nat-1/nat-20 checkbox is its
  own `<label>` — don't merge them back into one shared label.
- **Combat engine**: `isEngaged(c)`, `currentFighters()`, `orderedLiving()`
  (by `initRoll`), `nextTurn()` (resets `actionUsed`), `endTurn()` →
  `runRoundEvents()` (interjects reinforcements then per-round loud-noise
  before the next turn), `beginCombat()` → `runInitiative()` → `runLoudNoise()`,
  `applyDamage()` → `checkReinforce()` + `renderReminders()` (for the downed-PC
  banner).
- **Modals**: `openModal(html, opts)` / `closeModal()` / `flowModal()` (opens a
  light, dismissable modal for exploration resolutions — `opts.dismissable` +
  `opts.light` + `opts.closeBtn`; combat modals call `openModal` with no opts,
  so they stay non-dismissable). Combat console is `openTurnModal()` →
  `characterActions()` → `attackTarget/attackToHit/attackDamage/attackResult`
  — these four take an optional trailing `onResolved` callback; when present
  it's a **free attack outside the turn loop** (no end-turn chrome, no
  `actionUsed` side effect). `freeAttackSequence(attackers, afterAll)` +
  `chooseFreeAttack()` drive reinforcement free attacks through that same
  chain. Also: `rollGagModal()`, `reinforcementModal(done)`, `narrateModal()`.
- **Rendering**: `renderCombat()` (also computes the manual "fight broke out"
  button's zone from the current room's living threats), `renderPresent()`,
  `renderActions()` (routes every exploration flow through `flowModal`),
  `renderReadAloud()`, `renderReminders()` (loud-noise chip + `downedPartyMembers()`
  death-save banners), `renderErrata()`.
- All exploration flows (`runInfoFlow`, `runCheckFlow`, `flowShootLookout`,
  `flowRoomWindow`, `flowGag`, `flowUnchain`, `flowWeapons`, `flowOffMenu`) take
  a modal content element + a `done` callback (`closeModal`) — the old inline
  `#detail` panel is gone.

---

## 6. Key decisions already made (don't re-litigate)

- Rotating single-GM model (matches the book); "who plays whom" is data-driven.
- App points to read-aloud passages, **never reproduces** book prose — including
  in the published Artifact. Page images/scans of the book are also reproduction
  and won't be embedded there either, even for personal use; the read-aloud data
  model should stay "pointer today, droppable text/asset tomorrow" so it's
  ready the moment there's a license (e.g. from Urban Realms), without needing
  a rebuild. See open item below.
- Player enters roll **total** (adds modifier out loud) — modifier is taught in
  the tooltip. Nat-1/nat-20 auto-resolve so no number is needed then; on checks
  (not attacks) this is framed as a shortcut, not RAW.
- Page is **self-styling** (defines its own tokens) because the Artifact runtime
  gives only a reset.
- Lookout-shot DC conflict (book p.14 vs p.16): **use page 16**. Drop → Room 2
  DC 10 / Room 1 DC 15. Shout → Room 2 DC 6 / Room 1 DC 10. Logged as errata #1.
- Per-room awareness is independent and asynchronous; combat noise re-checks
  each round; these are house-rulings logged in the errata doc.
- A live, roof-alerted lookout auto-warns returning reinforcements (no roll) —
  book only spells out the "lookout missing" branch; errata #5.
- Wynn's gag: success frees it and still lets her act that turn; failure costs
  her action. A deliberate departure from strict RAW (see errata #6) — reviewed
  with the veteran-GM persona and reversed once, after weighing DC 18's
  difficulty against the rescue's emotional stakes. If it feels wrong at the
  table, that's a real signal to revisit, not just a rule to enforce.
- **Attraction Points: the app tracks and prompts nothing.** Removed the
  nat-1/20 "don't forget AP" nudges entirely. Rationale: the book (pp. 9–10)
  puts AP bookkeeping at **player discretion** ("keep track... at the player's
  discretion," "the character receiving the aid has the final say," "play the
  character as you see fit") — there is no instruction to the GM to announce
  AP moments, so the app shouldn't invent one. The **only** structured AP
  trigger in the book is combat crits/fumbles **within eyesight of the other
  PC** (During Combat, p.10) — even that is deliberately left off-app for now.
  This is unverified in real play; see open item below.
- Combat concentration (a caster losing a spell when hit) is **not modeled**,
  matching the book — the only place "concentration" appears in the book is as
  a romance Turn-on/Pet-Peeve trigger, never as the 5e combat rule. This was a
  deliberate simplification on the book's part; the app mirrors it. Revisit if
  it starts to matter (see open item below).

---

## 7. Open items / next steps (roughly prioritized)

1. **Re-run the UX-designer (BG3-literate) persona review.** It's the one
   lens from the stress-test round that never completed — the run hit a
   session usage limit mid-task with no findings delivered. See
   `PLAYTEST-FEEDBACK.md` §3.5. Everything else in that doc reflects the
   other three personas only.
2. **Decide the deployment target before next sharing this with anyone.**
   GitHub (`main`) is the source of truth now (§3), but the private Artifact
   URL is stale — it predates this whole session's work (modal migration,
   turn economy, lookout/reinforcement fixes, AP removal). Re-publish it
   before relying on that link again, or retire it in favor of pointing
   people at the repo / a fresh publish.
3. **Playtest the Attraction Points hands-off decision.** The app now does
   nothing for AP (see §6). Play a real session and see whether it actually
   gets forgotten (the risk both persona playtesters flagged) or whether an
   invested couple naturally notices and marks it themselves (Frank's bet).
   Only add any nudge if the playtest says so — and if so, mimic the book's
   own trigger (eyesight + crit/fumble) rather than inventing new ones.
4. **Concentration**: currently unmodeled (matches the book). Frank's actual
   concern is narrower than full concentration tracking — it's specifically
   whether multiple concentration effects (or the same spell hitting multiple
   targets) can coexist. Revisit with the veteran-GM persona if/when Wynn's
   actual spell list (pages 67–70) comes into play and this becomes a live
   question, rather than building it preemptively.
5. **Turn-modal rhythm feedback**: the turn modal auto-opens every turn,
   including for every reinforcement NPC individually (kept intentionally —
   Frank confirmed no condensing). Get a real playtest read on whether 8–9
   modals/round (post-reinforcements) feels right.
6. **Light-mode review**: most testing has been in dark mode; confirm
   light-mode contrast on the tinted (accent/warning/danger) boxes.
7. **Unbuilt Scenario One mechanics** (tracked in errata "known gaps"):
   the sneak-out forced ambush (book p.15 "During Battle Outside the Mill"),
   post-combat interrogation (DC 10 / DC 20 Persuasion, p.22), travel encounters
   + "Shelter from the Storm" (p.23).
8. **Two sources of truth for errata** (`SCENARIO-01-ERRATA.md` and the in-app
   `ERRATA` array) will drift — collapse to one when the project is properly
   scaffolded.
9. **Read-aloud prose in-app, license-ready**: players (especially the
   non-tabletop-literate persona) find "now go read page 18 aloud" breaks
   immersion. The fix they want — the app carrying the actual prose — is a
   copyright question, not a code question: reproducing the book's text (or
   page scans) in a **shared/published** Artifact isn't something to build
   without a license from Urban Realms, personal use notwithstanding. The
   architecture should stay ready for it though: model each read-aloud beat as
   a data field with an empty `readText`/`readImage` slot, so licensed content
   can be dropped in per-scene later without restructuring. Don't hand-type
   book prose into the app in the meantime.
10. **Player companion (part 2, deferred)**: persona playtesting strongly
   validated that the player-without-the-tablet (running just Tarric + Briar
   off the paper sheet) is under-served — no feedback, no sense of options,
   waiting on the GM. Frank's instinct is a **separate, integrated** companion
   app for that seat (flash reminders/hints tied to their character sheet,
   notified of crits etc. via the GM app) — explicitly a fast-follow, not now,
   to avoid scope creep. Note the real design tension already surfaced: feeding
   the player's romantic data (Turn-ons/Pet Peeves) into a synced app would let
   it suggest things, but the GM would then see it too, breaking AP's current
   secrecy — unresolved, revisit when this is actually scoped.
11. **Beyond Scenario One**: the app is hard-coded to the Old Mill. Generalizing
   to scenarios 2–4 (and the GM-role flip) is future work.

---

## 8. Working method that worked well

- A **UX-designer subagent** and a **veteran-D&D-GM subagent** were used as
  reviewers/personas each time a design question came up (e.g. mode-switch,
  turn alerts, the lookout-DC conflict, mock-playthroughs to find gaps). Re-spawn
  those personas for design/table-craft calls rather than deciding solo.
- A full **stress-test round** — the same two personas plus two invented
  novice-couple personas playing both seats (GM-with-app and
  player-with-only-a-sheet) — surfaced real bugs and real design gaps that
  code review alone hadn't caught. Worth repeating before any future publish
  milestone. Full writeup, including where a persona's own recommendation got
  pressure-tested and reversed: `PLAYTEST-FEEDBACK.md`.
- Every nontrivial book question was answered by **reading the rendered PDF page
  image directly**, not the lossy text extract.
- **Syntax-check + local-server browser test before publishing.** Non-negotiable.
- When a persona's feedback conflicts with a stated book rule or a durable
  project principle (e.g. "never reproduce the book's prose"), **the book /
  principle wins** — personas are a lens for finding gaps and pressure-testing
  judgment calls, not a vote that overrides what's already been decided.
