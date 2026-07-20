# reference/ — not tracked by git

This folder holds source material for fact-checking the app against the book:

- `DriveThruPDFRescue5E.pdf` — your own purchased copy of *Rescue of the
  Blackthorn Clan* (Date Night Dungeons, Urban Realms). Book page **N** =
  PDF page **N+1**.
- `RescuePDFExtract.md` — a full text extraction of that PDF, useful for a
  quick `grep`/search to locate which page something is on. **Do not trust
  its exact wording** — it has known transcription errors. Once you've found
  the right page number, verify the actual rule against a rendered image of
  that page, not this file. See HANDOFF.md §3 for how (`pdftoppm`, one page
  at a time, e.g. `pdftoppm -f 16 -l 16 -png -r 150 DriveThruPDFRescue5E.pdf
  page`).

Both files are copyrighted and are **deliberately excluded** from git (see
the root `.gitignore`) — they never get committed or pushed, no matter what
this repo's visibility is set to. If you clone this repo fresh, this folder
will be empty; drop your own purchased PDF in as `DriveThruPDFRescue5E.pdf`
to restore the verification workflow. The app itself needs neither file to
run — it only ever points to page numbers, never reproduces the text.
