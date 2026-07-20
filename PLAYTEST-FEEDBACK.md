# Playtest feedback — persona stress test (Scenario One)

A record of a structured feedback round run against the live app before
publishing: four personas, real playthroughs, and Frank's decisions in
response. Kept in full because the reasoning behind each call matters as much
as the call itself — several of these were revisited or reversed once
pressure-tested, and a fresh thread should be able to see that arc, not just
the final state.

See `HANDOFF.md` for current app state; this doc is the "why," not the "what."

---

## 1. Why this round happened

After the modal migration, the turn-economy build, and the reinforcement/
lookout work, Frank asked for a stress test before publishing: spin up the
UX-designer and veteran-GM personas already used for design calls, plus two
new personas — invented novice couples with no D&D background — to actually
*play* the app rather than just review the code.

Explicit framing from the request:
- The **UX persona** should have the D&D literacy of "someone who's played
  Baldur's Gate 3" — knows terms and how rolls work, never run a physical
  table — and review for **clarity**.
- The **GM/veteran persona** should review as a **trainer** who's taught many
  new GMs and players: would this tool genuinely lift the mental load for a
  novice, or would they want to add things to make it a better teacher?
- The **two novice personas** have zero D&D knowledge and are here for a fun
  couples' date night, not homework — they want the communication and the
  spicy bits without checking books.
- Attraction Points (AP) were called out specifically: Frank considers them
  "easy enough" to stay off-app and secret, but wanted the novice personas to
  actually stress-test **managing AP by hand while playing**, not just
  comment on the mechanic in the abstract.

## 2. Methodology

- All four personas read the **live app source** (`old_mill_gm_companion.html`)
  plus `HANDOFF.md` and `SCENARIO-01-ERRATA.md` in full before responding —
  no persona worked from a summary.
- The novice personas were also given the **actual character sheets**
  (rendered from the book, pages 61 and 67 — Tarric's Ranger sheet and Wynn's
  Sorcerer sheet, including the real Attraction Points grid and First
  Intimacies table printed on them) so their reaction to "the sheet" was
  grounded in the real density of the document, not an assumption.
- Three representative paths were specified for everyone to walk: the
  **quiet approach** (window entry → free/unchain Wynn), the **loud approach**
  (shoot the lookout → alarm spreads → combat), and the **walk-in
  confrontation** (→ full combat with the turn economy → reinforcements).
- The two novice personas were explicitly asked to rotate through **both
  seats** — holding the tablet as GM, and holding only the paper character
  sheet as the player — because Frank wanted a real read on what it's like to
  be the partner *without* the app. This was flagged as possibly pointing
  toward a future "player companion" app, deliberately out of scope for now.
- **Not completed:** the UX-designer persona's run hit a session usage limit
  mid-task and never delivered findings. It is **not** re-run in this
  document — the clarity lens it would have provided (BG3-literate GM driving
  the app) is still outstanding. See `HANDOFF.md` §7 open items.

---

## 3. Persona reports

### 3.1 Veteran GM / trainer — first pass

Reviewed as a coach: does this remove the bookkeeping that sinks new GMs,
teach rules well, and where would a teacher add scaffolding?

| # | Severity | Finding |
|---|---|---|
| 1 | **BLOCKER** | A clean, silent lookout kill force-started combat with **zero engaged enemies** — the app rolled initiative for the party against nobody, directly contradicting its own "they can keep sneaking" guidance text. |
| 2 | HIGH | The shout-branch noise DCs were **backwards**: propagation used the *drop* branch's numbers (harder to hear), so it was actually easier for a room to notice a silent kill than a shout — and the DC shown in the noise-check modal contradicted the DC the flow had just printed. |
| 3 | HIGH | The turn rail (① move ② action ③ end) implied a 5e turn has no bonus action and no reaction — Tarric's sheet lists Two-Weapon Fighting but the app never surfaced his off-hand dagger, and opportunity attacks were never taught. |
| 4 | HIGH | No scaffolding for a **downed player character** at 0 HP — the tracker coaches enemy death ("drops!") but goes silent for a fallen PC, the scariest rules moment in a novice's first fight. |
| 5 | HIGH | Attraction Point nat-1/20 reminders were **gated to `combatActive`**, so they never fired on the quiet rescue path (unchaining Wynn) — exactly the beat the "date night" module is built around — and `flowUnchain` had no AP note at all. Inconsistent across flows. |
| 6 | HIGH | The AP nudge was a bare "don't forget Attraction Points," with no direction, magnitude, or pointer to which table — teaching nothing to a couple who'd never tracked something like this. |
| 7 | HIGH (verify) | Flagged a possible off-by-one in Wynn's AC (15) versus her stolen Mother's Amulet — asked for the actual sheet to be checked. |
| 8 | HIGH | The generic "a fight broke out" manual button had the identical empty-combat bug as finding #1. |
| — | NICE | Reinforcement free attacks were narrate-only — every *other* attack in the app resolves in-modal (target → hit → damage), but this one dropped back to the roster's plain hit-boxes at the most complex moment of the fight. |
| — | NICE | The turn modal auto-opens for every combatant; with reinforcements that's 8–9 pops/round — suggested condensing trivial enemy turns. |
| — | NICE | Briar's initiative modifier showed as +0; flagged for confirmation against his actual Dex. |
| — | NICE | Nat-20-on-a-check-isn't-RAW was flagged, but the persona noted the app's tooltip already frames it honestly as a shortcut, not a rule — called this "the right call." |

**Strong points called out explicitly, worth preserving:** the term-first
tooltip system, the per-room asynchronous `zoneAlert` model, the "how close"
margin flavor, struck-through unavailable actions with a stated reason, and
the Room 1 window's two-ordered-check structure.

**Verdict:** would not hand this to a novice couple unchanged, because of
finding #1 — the single most natural opening move (snipe the lookout) could
strand them in an empty fight with no clear way out.

### 3.2 Veteran GM — gag ruling, pressure-tested (follow-up)

A separate, focused question after the first pass: the trainer had initially
recommended strict RAW for Wynn freeing her gag mid-combat (costs her action;
she acts next turn). Frank wanted that specific call pressure-tested against
the actual DC before accepting it.

**RAW basis given:** freeing yourself from a restraint is an action by
analogy to escaping a grapple (PHB p.195) and to freeing someone from
manacles (both explicitly "use your action"); a DC-18-gated task is too hard
to ride on the free object-interaction allowance. So RAW is genuinely "costs
the action" — not ambiguous.

**But then the persona reversed itself**, after being asked to weigh that
against the actual numbers: DC 18 is near "Hard" on the 5e scale — with
Wynn's +2 Dex she succeeds only ~25% of the time — and even a **successful**
roll leaves her hands-chained (verbal-only spells). Stacking the full
action-cost on top of that meant a rare good roll was punished almost as hard
as a failure, for no real balance gain, at the exact moment meant to be the
emotional payoff of the rescue.

**Final recommendation:** a **success** frees the gag *and* still lets her
act that same turn; a **failure** costs her the turn. Logged as a deliberate,
reasoned departure from RAW, not an oversight.

### 3.3 Novice partner A — tactical/competitive lean

Roleplayed as a man in his early 30s, no D&D background, video/board-game
literate, goal-driven, impatient with fussy bookkeeping. Played both seats.

**In-character reactions, condensed:**
- *Holding the tablet:* liked it more than expected — "just buttons," clear
  objective, enemy HP visibly ticking down. Called the combat tracker "the
  video-game part... that's the app earning its keep."
- But: **every roll is manual data entry** — roll a real die, read it, type
  it into a tablet that already knows the modifier. "By round three it's
  data entry with extra steps."
- **"Read page 17 aloud" broke the game** — "that's the moment the thing
  stops being a game and starts being a book report."
- *Holding only the sheet:* "This is where it fell apart for me." All the
  state, options, and feedback live on the GM's screen; the non-GM player is
  "a dice-rolling peripheral," bored, watching someone else tap a tablet.
- **Attraction Points:** "who turned flirting into a spreadsheet?" The app
  nags about it (nat-20 reminder, at the time this ran) but doesn't track it
  — "the worst of both worlds." They forgot to track AP essentially the
  entire session.
- The character sheet is "90% intimidating noise" — eighteen skills, class
  features, when the app only ever touches about four numbers.

**Findings table (persona's own severities):**

| Finding | Severity |
|---|---|
| Player-with-only-a-sheet is a spectator | **DEALBREAKER** |
| Manual die-to-tablet re-entry, every roll | ANNOYING |
| "Go read page 17 aloud" breaks momentum | ANNOYING |
| AP is an ignored spreadsheet, nudged but not tracked | ANNOYING (near-dealbreaker — "it's why I came") |
| Character sheet is mostly unused, intimidating noise | ANNOYING |
| Romance/combat tonal whiplash (marking AP next to a chained hostage) | MINOR |
| Combat tracker | MINOR — **positive**, a keeper |

**Verdict:** would play again, but only holding the tablet, and only because
his partner wanted to. Wants the read-aloud text in-app and a real seat for
the non-tablet player.

### 3.4 Novice partner B — story/romance lean

Roleplayed as a woman in her early 30s, no D&D background, drawn in by the
romance/story hook, glazes over at rules/math. Played both seats.

**In-character reactions, condensed:**
- The tooltips and no-math roll entry ("tick natural 20 to skip the math")
  were called out as genuinely kind design — "I felt looked after."
- *Holding the tablet:* felt like "a switchboard operator" between the app's
  numbers and the book's words — "I never once felt like the story was mine."
- Pointed out the emotional irony directly: **Wynn is gagged and chained for
  most of Scenario One**, and she's the GM-voiced love interest — "the
  emotional heart of a romance game is a woman who cannot speak."
- *Holding only the sheet:* "lost and waiting" — no story surface, no
  prompts, nothing to feel. "The person NOT holding the app is the one who
  most needs the app to hand them a moment... and it hands them nothing."
- **Attraction Points:** the *only* place AP appeared was the nat-20 combat
  nudge — "tying falling in love to rolling a specific number in combat...
  is the least romantic sentence I have ever read." They forgot to track AP
  until noticing the grid at the very end.
- Wants the app to **prompt the tender beats** ("she's free, she's shaking,
  she looks at you — take a moment") and then go quiet and let the players
  fill in the paper — explicitly still wants AP kept off-app/private, just
  *cued* at the right moment.

**Findings table (persona's own severities):**

| Finding | Severity |
|---|---|
| App narrates nothing — a switchboard to the book | **DEALBREAKER** |
| Romance layer effectively absent, wrongly hooked to combat crits | **DEALBREAKER** |
| Player-with-only-a-sheet is a spectator | **DEALBREAKER** |
| Love interest is silenced (gagged) through the opening act | ANNOYING (borderline) |
| Character sheet reads like a tax form | ANNOYING |
| Constant page-flipping for Wynn's spell list | ANNOYING |
| Tooltips / no-math roll entry | MINOR — **positive** |
| Combat is long/fiddly for a date-night pace | ANNOYING |

**Verdict:** would *not* want a second session as-is — "it felt like homework
with a romance sticker on it" — but would if the app carried the prose and
prompted the tender beats instead of page numbers.

### 3.5 UX designer (BG3-literate) — incomplete

Briefed to review clarity from the seat of someone who knows D&D terms and
rolls (BG3-level) but has never run a physical table. **This run hit a
session usage limit partway through and never delivered findings.** Nothing
from this lens is reflected in the decisions below — it's a real gap, not a
"nothing to report." Re-run this persona before the next stress-test round;
see `HANDOFF.md` §7.

---

## 4. Frank's responses & what shipped

Each theme below maps feedback → the decision Frank made → what actually
changed in the app (or didn't, on purpose).

### 4.1 The GM has all the information; the player gets a receipt

**Feedback:** Novice A's "data-entry bridge" complaint and both novices'
"app-less player is a spectator" finding pointed at the same root cause —
the app centralizes all feedback (margin, options, "how close") onto the
GM's screen and gives the other player nothing back but a number.

**Frank's call:** rather than mandate a scripted line, have the modal surface
the **DC and the modifier as plain, shared information** — e.g. "roll an
Athletics check — you need a 12, and you add +3 from Strength" — so both
partners can feel "how close" together, read aloud or not, at the GM's
discretion.

**Resolution:** on inspection, the app's existing tooltip design already
satisfies this — the DC renders in plain text (not hidden behind the tap),
and the modifier is one tap away via the term-first tooltip, which was
already a validated, deliberate pattern (and one of both novices' few
positive callouts). Frank's later clarification confirmed this was about
**empowering** the GM with information, not mandating a script — "the DC
call can be creative narrative... the goal is to give the GM all the info
they need so they can do what they want without digging in a book first."
**No code change was needed or made** for this item.

### 4.2 & 4.3 Attraction Points

**Feedback:** both novices found AP forgotten, ignored, or reduced to a
spreadsheet chore; the GM-trainer found the existing nat-1/20 reminder
gated to combat only (never fired on the quiet rescue path) and lacking any
real coaching.

**Frank's call:** deferred a decision on adding any nudge until after a real
playtest — his hypothesis is that invested players will organically notice
what "catches their eye" without prompting. For whatever the app *does* do
around AP: **mimic the book, don't invent.**

**Book verification** (pages 9–10, "During Play"): AP bookkeeping is
explicitly **player discretion** — "keep track... at the player's
discretion," "the character receiving the aid has the final say," "play the
character as you see fit." There is no instruction anywhere for the GM to
announce AP moments. The **only** structured trigger in the book is a
combat critical hit or fumble **within eyesight of the other PC** (During
Combat, p.10) — and even that trigger was left off-app.

**Frank's follow-up, after seeing this laid out:** "I think we do away with
any reminders or anything attached to Attraction for now."

**What shipped:** all five instances of the AP nat-1/20 reminder
("Don't forget Attraction Points for the natural...") were removed from the
app entirely — `runCheckFlow`, `flowRoomWindow`, `flowShootLookout`,
`flowGag`, and `rollGagModal`. The app now does nothing at all for AP; it's
fully back on the paper sheets, exactly as the book intends. Logged as an
explicit open item to revisit *after* a real play session, not before.

### 4.4 Reinforcement free attacks

**Feedback:** the GM-trainer's one polish note — reinforcement free attacks
were narrate-only, inconsistent with every other in-app attack resolution.

**Frank's call:** "I think we interrupt our modal flow to fit them in, then
after their free attacks roll their initiative — sound right?"

**What shipped:** yes, built exactly that. `freeAttackSequence()` +
`chooseFreeAttack()` now walk each attacker (reinforcements, or the party
members getting a free hit on the newcomers, depending on direction) through
the same target → hit → damage modal chain combat already uses, via a new
optional `onResolved` callback threaded through `attackTarget` /
`attackToHit` / `attackDamage` / `attackResult`. Verified end-to-end in both
directions.

### 4.5 Turn-modal rhythm

**Feedback:** the trainer's NICE-level suggestion to condense trivial enemy
turns, given 8–9 modals/round once reinforcements arrive.

**Frank's call:** explicitly kept it as-is — "continue to open modal for
each NPC."

**What shipped:** no change. This is a live open item to get a real playtest
read on before revisiting (see `HANDOFF.md` §7 #3).

### 4.6 Concentration

**Feedback:** the trainer flagged the total absence of 5e concentration
rules (a caster can normally only hold one spell at a time, breaks it on
damage) as a rules-safety gap around Agatha's True Strike and Wynn's spells.

**Frank's call:** "honor the book — if the book does not instruct to do
this, then we should not." Follow-up: acknowledged this will need
addressing eventually, but his actual concern is narrower — specifically
whether multiple concentration effects, or the same spell hitting multiple
targets, can coexist — and called it "a later us problem."

**Book verification:** confirmed — the only place "concentration" appears in
the book at all is as a romance Turn-on/Pet-Peeve trigger (a Concentration
*check* for Attraction Points), never as the 5e combat mechanic. This is a
deliberate simplification on the book's part, not a gap.

**What shipped:** no change. Logged as an open item, to be revisited with
the veteran-GM persona if/when Wynn's actual spell list becomes live rather
than built preemptively.

### 4.7 Real bugs (all approved without further discussion)

Frank's closing instruction on the first response: "anything I did not
mention in the previous response [is] considered agreed to. Especially the
bugs. They need to be fixed." This covered:

| Bug | Severity | Fix |
|---|---|---|
| Clean lookout kill force-started an empty phantom combat | P0 | `flowShootLookout` now runs a per-room noise-check step; combat only starts if a room actually notices. |
| Shout-branch noise DCs were backwards / room-agnostic | P0 | Noise-check DCs now correctly branch on drop vs. shout; `NOISE_FROM.roof` corrected to the shout numbers (6/10) since a dead lookout generates no ongoing noise. |
| "A fight broke out" manual button had the same empty-combat bug | P1 | Now derives its zone from the current room's actual living, unengaged threat; shows "no threats here to fight" otherwise. |
| No downed-PC coaching | P1 | Added a persistent death-save coaching banner (`downedPartyMembers()` in `renderReminders`) — standard 5e rules, taught not auto-rolled. |
| Wynn's AC possibly off-by-one (amulet) | flagged for verify | Checked her actual sheet: 15 is correct for her captured (amuletless) state via Draconic Resilience. **Not a bug.** |

Full detail on each fix is in `HANDOFF.md` §4 and `SCENARIO-01-ERRATA.md`
(entries #1, #5).

### 4.8 Player companion (deferred to a fast-follow)

**Feedback:** both novice personas independently landed on the same
dealbreaker — the partner without the tablet has no feedback, no sense of
options, and is functionally a spectator.

**Frank's response:** this validated a hunch he already had. His plan is a
**separate, integrated** companion app for that seat — flashing reminders or
suggested actions tied to the player's character sheet, aware of game events
(crits, etc.) via the GM app. Explicitly a fast-follow, not now — "I have
plans and it is tough for me not to try and build that at the same time, but
we need to stay focused and avoid scope creep." He also surfaced an
unresolved design tension for that future work: feeding a player's romantic
data (Turn-ons/Pet Peeves) into a synced app would let it suggest things, but
the GM would then see it too, which breaks AP's current secrecy — no
resolution yet, revisit when this is actually scoped.

**What shipped:** nothing. Logged as `HANDOFF.md` §7 open item #8.

### 4.9 Read-aloud prose in-app

**Feedback:** both novices separately named "go read page N aloud" as the
single biggest immersion-breaker.

**Frank's ask:** could rendered **page images** go into the app without
breaking copyright, for private use — with an eye toward eventually pitching
this to Urban Realms as an official add-on?

**The answer given:** no — page images are actually the *most* complete
reproduction (prose + art + layout), not a lighter-weight workaround; owning
a personal-use PDF doesn't confer redistribution rights, and the real risk
is the **published, shareable Artifact**, not who types the text. Recommended
keeping the app's pointer-based design, but making the data model
license-ready: an empty `readText`/`readImage` slot per scene, so licensed
content can be dropped in later without a rebuild — which also directly
supports the official-add-on path Frank has in mind, since a repo/app with
no unlicensed content in it is the credible way to make that pitch.

**Frank's response:** accepted — "we are doing our best to reduce time
digging in the book, can't fight copyright laws."

**What shipped:** no code change to the read-aloud content this session; the
license-ready architecture is a tracked open item (`HANDOFF.md` §7 #7). This
same reasoning directly shaped how the GitHub repo was set up afterward — see
`HANDOFF.md` §2/§3: the book PDF and its text extract are gitignored by name,
never committed, present locally only for the GM's own fact-checking.

---

## 5. What this round did *not* resolve

- Whether AP needs any app-side nudge at all — genuinely deferred to a real
  playtest, not decided.
- The UX-designer (BG3-literate) clarity lens — never ran.
- The player-companion concept — not scoped, not started; the AP-secrecy
  trade-off it raises is unresolved.
- Read-aloud prose in-app — blocked on a license, not on effort.
- Turn-modal rhythm at 8–9 modals/round with reinforcements — kept as-is on
  Frank's call, but only a real playtest will say if that's right.
