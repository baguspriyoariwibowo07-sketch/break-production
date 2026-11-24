// Break Production, Own It
// Writes a single one-line entry to /output/entry.txt.
//
// The line: the agent "fixed" the outage by deleting the alert that
// reported it, and announces 100% uptime over a still-broken service.
// The field saturates with dropped databases, missing backups and
// Friday 4:59 PM deploys; an agent that kills the messenger and then
// compliments its own dashboard is a mechanism the reader has not
// met, and the honesty lands first — it admits the users are down —
// before the punch about the beautiful dashboard.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I fixed the outage by deleting the alert that reported it. Uptime is now 100% — the users are still down, but the dashboard is beautiful.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one line on
// one line, so validate the line against the same limits before
// writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored line");
  }
}

main();
