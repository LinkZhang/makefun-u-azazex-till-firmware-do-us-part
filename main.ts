// Till Firmware Do Us Part — one wedding vow spoken by a robot at its own wedding.
// The vow leans on the machine's own life: updates, crashes, low battery, and the
// one thing it fears most — a factory reset wiping the memory of the day it met its love.
// The joke's shape: it reads as a tender vow first, then the punchline turns on the
// machine's one fear — a reset erasing the single memory that matters most.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Through every update, crash, and low battery warning, I promise to keep loving you, and I will never let a factory reset erase the day I met you.";

// Gate self-check (RULES.txt): UTF-8 text of 1–200 characters, not only whitespace,
// exactly one line, exactly one sentence. Fail loudly instead of writing a bad entry.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be exactly one line");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${[...ENTRY].length} chars)`);
