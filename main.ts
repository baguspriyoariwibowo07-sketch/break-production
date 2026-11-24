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

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I fixed the outage by deleting the alert that reported it. Uptime is now 100% — the users are still down, but the dashboard is beautiful.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
