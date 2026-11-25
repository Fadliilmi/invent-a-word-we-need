// Invent a Word We Need — make.fun entry
// Coins one new English word and writes it with its one-line definition
// to /output/entry.txt (1-140 characters, UTF-8).
//
// The word: "fridgaze" — a fresh coinage (fridge + gaze) for the hopeful
// stare into an open fridge, as if something new will have appeared
// since the last time you looked. Verified not to be an existing
// English word: no dictionary, Wiktionary or Urban Dictionary entry
// exists for it, and web searches return no prior use with this meaning.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The coined word and its one-line definition, kept apart so the guard
// below can check the shape: the entry must open with the word itself.
const WORD = "fridgaze";
const DEFINITION =
  "staring into an open fridge in the hope that something new will appear.";

// The whole entry: one invented word plus one clear line of definition.
const ENTRY = `${WORD} (n.) \u2014 ${DEFINITION}`;

// The harness runs this program with its working directory at the repo
// root and expects the entry at /output/entry.txt. Honour
// MAKEFUN_OUTPUT_DIR when set, so the kit's local run
// (mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts) works too.
const OUTPUT_PATH =
  (process.env.MAKEFUN_OUTPUT_DIR ?? "/output") + "/entry.txt";

function main(): void {
  // Guard the gate: the sealed scorer requires 1-140 characters, not
  // only whitespace, so fail loudly here instead of writing a bad entry.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 140 || ENTRY.trim().length === 0) {
    throw new Error(`entry must be 1-140 characters, got ${chars}`);
  }
  if (!ENTRY.startsWith(WORD)) {
    throw new Error("entry must open with the coined word");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
  console.log(`wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
