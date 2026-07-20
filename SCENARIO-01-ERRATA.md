# Scenario One — "The Old Mill": book differences & house rules

This is the running record of every place the companion app **deviates from,
picks a side on, or fills a gap in** the printed book for Scenario One. It does
**not** list ordinary content (where the app just faithfully mirrors the book) —
only the spots a player comparing app-to-book might notice a difference and want
to know why.

Each scenario gets its own list. The app links to this per-scenario list so a
table can check it mid-play if something looks off.

> Scope note: transcription bugs we found and fixed in our own data (e.g. an
> improvised-weapon table we'd mis-typed, a gag rule we'd stated backwards) are
> **not** listed here — those are just us matching the book correctly, not
> deviating from it. This list is only genuine book issues.

Legend:
- **Book contradicts itself** — the book states two different things; we pick one.
- **Book leaves it open** — the book specifies a trigger but not its outcome; we add a ruling.

---

## 1. Book contradicts itself — lookout-shot Perception DCs differ between two pages

**Where:** book pages 14 and 16.

**The contradiction:** both pages describe the same event (shooting the roof
lookout) and its two branches (he drops / he survives and shouts), but give
different Perception DCs for the same rooms:

| Branch | Room | Page 14 | Page 16 |
|---|---|---|---|
| Lookout drops | Room 2 | DC 10 | DC 10 |
| Lookout drops | Room 1 | **DC 18** | **DC 15** |
| Survives, shouts | Room 2 | **DC 5** | **DC 6** |
| Survives, shouts | Room 1 | DC 10 | DC 10 |

**What the app does:** uses the **page 16** numbers (Room 1 DC 15 / Room 2 DC 6).

**Why:** we read both passages in context looking for a reason they might be two
different checks — there isn't one; it's the same rule typed twice with the
numbers drifting during editing. Page 16 is the block printed right next to the
location description a GM is actually looking at when the shot happens (grouped
with Points of Entry and the lookout's stat card), where page 14 is a once-read
pre-combat preview. When in doubt, we trust the copy at the point of use.

---

## 2. Book leaves it open — what a passed/failed lookout-shot check actually leads to

**Where:** book pages 14 and 16.

**The gap:** the book gives the detection DCs above but never states what happens
on a success or a failure — only *that* a room might notice.

**What the app does:** a room that **makes** its Perception check notices the
disturbance and combat begins in that room (roll initiative). Rooms notice
**independently** — Room 2 can catch on while Room 1 stays unaware, or vice versa.

**Why:** the book giving each room its *own separate DC* for the same event is a
strong signal the author intended asynchronous, per-room awareness (otherwise a
single DC would do). That independence is also what makes the −4 sneaking
penalty meaningful. This is standard 5e practice for a stealth approach, so we're
confident filling the gap this way.

---

## 3. Book leaves it open — how an alarm in one room spreads to the others

**Where:** not specified anywhere in the book.

**The gap:** once one room is alerted and a fight starts there, the book never
says how (or whether) the still-unaware rooms find out.

**What the app does:** once fighting actually starts in a room, any room that
hasn't noticed yet gets its normal **"loud noise" Perception check** (the DCs the
book already prints for each room) to realize what's happening. There is **no**
instant, automatic building-wide alarm — an unaware room stays unaware until it
makes that check.

**Why:** a sword fight is obviously loud, so reusing the book's existing
loud-noise DCs is the least-invasive ruling — it invents no new numbers. And it
preserves the tension the book deliberately built with per-room awareness rather
than flattening it into "someone noticed, so everyone knows."

---

## 4. Book leaves it open — the order of the two checks for Room 1's window

**Where:** book pages 14 and 17.

**The gap:** climbing through Room 1's window needs two checks — a DC 10 Athletics
check to physically fit through the tight, chest-high gap (page 17) and a −4
Stealth check against the guard's passive Perception (pages 14 and 17). The book
never says which is resolved first.

**What the app does:** resolves the **Athletics first** (can they get through?),
then the **Stealth** (did the guard notice?). A natural 1 on the Athletics is a
fall in the stream, and the splash gives the guard its own DC 6 Perception check.

**Why:** climbing first, then detection, is the natural order — if a character
can't physically get through, there's nothing to be stealthy about yet. This is
our call, not the book's.

---

## 5. Book leaves it open — whether a surviving lookout warns the returning ruffians

**Where:** book page 15 ("NPC DC Checks" and "During Battle Outside the Mill").

**The gap:** the book only writes out the returning-ruffians' Perception check for
the case where "the battle inside has ended and the lookout is missing" (DC 10),
plus the battle-ongoing case (DC 8). It never says what happens if the lookout
(Harold) is still alive when the trio returns.

**What the app does:** if Harold is alive **and** aware of the fight (his roof zone
is alerted), he auto-warns the returning ruffians — no check, they arrive ready.
If he's down, or on the roof but oblivious, the app falls back to the book's
printed check (DC 8 while fighting, DC 10 once it's over). The reinforcement modal
shows Harold's status so the table can see which case applies.

**Why:** page 15 says a present lookout "will start shooting and will shout and
stomp on the roof to alert the ruffians inside." A lookout making that much noise
would obviously also warn allies walking back up the path, so a live, alerted
lookout auto-warning them is the least-invasive way to fill the gap — it changes
none of the book's printed branches, only adds the one the book left blank.

---

## 6. Book leaves it open — whether freeing Wynn's gag costs her whole turn

**Where:** book page 15 (sets the gag's DC 18) and general 5e turn rules.

**The gap:** the book gives DC 18 to remove Wynn's gag but never says what it costs
on her turn. By strict 5e rules, freeing yourself from a restraint is an action.

**What the app does:** a **successful** DC 18 frees the gag **and** still lets Wynn
act that same turn (cast a spell that needs only spoken words — her hands are still
chained — or move). A **failed** attempt uses up her action for the turn; she can
still move and try again next round.

**Why:** DC 18 is nearly "Hard" (~25% for Wynn at +2 Dex), and even freed she's
still hands-chained (verbal-only spells). Making a success *also* cost her whole
turn double-punishes a rare good roll for no real balance gain, and it lands on the
exact rescue beat the module is built around. So we reward the hard-won success and
let the failed attempt carry the action cost. (Table-craft call, reviewed with a
veteran-GM persona.)

---

## Known gaps not yet built (tracked, not yet addressed)

These are real Scenario One mechanics the app does not yet cover. Listed so
they're not forgotten, separate from the deviations above.

- **Sneak-out forced ambush** (page 15, "During Battle Outside the Mill"): leaving
  the mill without ever fighting triggers an immediate outdoor fight with the
  returning trio; if the lookout is alive he shouts and the inside ruffians join
  in 3 rounds.
- **Interrogation** (page 22): questioning captured ruffians — DC 10 Persuasion
  for basics, DC 20 for the "they were also told to kill the Thane" reveal.
- **Travel encounters** (page 23): the optional d4 encounters on the way home,
  plus the mandatory "Shelter from the Storm" beat. Off the physical map.
- **Automatic combat-noise trigger:** the cross-room loud-noise check (deviation
  #3) is currently a manual reminder, not something the app fires on its own when
  a fight starts.
