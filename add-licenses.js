// @ts-check
"use strict";

// cSpell: words addlicense hangtiancheng
/** Add MIT license headers to files that are not git-ignored. */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

/** @type {string} */
const LICENSE_NAME = "MIT";
/** @type {string} */
const COPYRIGHT_HOLDER = "hangtiancheng";
/** @type {number} */
const DEFAULT_BATCH_SIZE = 200;

/**
 * @typedef {object} CliArgs
 * @property {string|null} repoRoot - Explicit repo root, or null to auto-detect.
 * @property {boolean} dryRun - Print files without editing.
 * @property {number} batchSize - Max files per addlicense invocation.
 */

/**
 * Parse CLI arguments.
 * @param {string[]} argv - process.argv or equivalent.
 * @returns {CliArgs}
 */
function parseArgs(argv) {
  /** @type {CliArgs} */
  const result = {
    repoRoot: null,
    dryRun: false,
    batchSize: DEFAULT_BATCH_SIZE,
  };
  const args = argv.slice(2);

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--repo-root") {
      result.repoRoot = args[++i] ?? null;
    } else if (args[i] === "--dry-run") {
      result.dryRun = true;
    } else if (args[i] === "--batch-size") {
      result.batchSize = Number(args[++i]) || DEFAULT_BATCH_SIZE;
    }
  }
  return result;
}

/**
 * Resolve the repository root directory.
 * @param {string|null} explicitRoot - User-specified root, or null for auto-detect.
 * @returns {string} Absolute path to the repository root.
 */
function findRepoRoot(explicitRoot) {
  if (explicitRoot !== null) {
    return path.resolve(explicitRoot);
  }

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const result = spawnSync("git", ["rev-parse", "--show-toplevel"], {
    cwd: scriptDir,
    stdio: ["pipe", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    throw new Error("Failed to detect git repo root");
  }
  return path.resolve((result.stdout ?? Buffer.alloc(0)).toString().trim());
}

/**
 * Resolve the addlicense executable from PATH or the default Go bin dir.
 * @returns {string} Absolute path to addlicense binary.
 */
function findAddlicenseBinary() {
  const result = spawnSync("which", ["addlicense"], {
    stdio: ["pipe", "pipe", "pipe"],
  });
  if (result.status === 0) {
    return (result.stdout ?? Buffer.alloc(0)).toString().trim();
  }

  const goPath = process.env.GOPATH ?? path.join(os.homedir(), "go");
  const defaultBin = path.join(goPath, "bin", "addlicense");
  if (fs.existsSync(defaultBin)) {
    const stat = fs.statSync(defaultBin);
    if (stat.isFile()) return defaultBin;
  }

  throw new Error(
    "addlicense not found. Install it with: go install github.com/google/addlicense@latest",
  );
}

/**
 * List tracked and untracked files that are not excluded by gitignore.
 * @param {string} repoRoot - Absolute path to the repo root.
 * @returns {string[]} Repository-relative file paths.
 */
function listGitVisibleFiles(repoRoot) {
  const result = spawnSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: repoRoot, stdio: ["pipe", "pipe", "pipe"] },
  );

  if (result.status !== 0) {
    throw new Error("git ls-files failed");
  }

  const raw = (result.stdout ?? Buffer.alloc(0)).toString();
  /** @type {string[]} */
  const entries = raw.split("\0").filter(Boolean);
  return entries.filter((entry) => shouldIncludePath(entry, repoRoot));
}

/**
 * Decide whether a repository-relative path should be processed.
 * @param {string} relativePath - Repo-relative path.
 * @param {string} repoRoot - Absolute repo root.
 * @returns {boolean}
 */
function shouldIncludePath(relativePath, repoRoot) {
  const absolutePath = path.join(repoRoot, relativePath);
  try {
    return fs.statSync(absolutePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Split an array into fixed-size chunks.
 * @param {string[]} items
 * @param {number} batchSize
 * @returns {string[][]}
 */
function chunked(items, batchSize) {
  /** @type {string[][]} */
  const chunks = [];
  for (let start = 0; start < items.length; start += batchSize) {
    chunks.push(items.slice(start, start + batchSize));
  }
  return chunks;
}

/**
 * Run addlicense over the selected repository files.
 * @param {string} addlicenseBinary - Path to the addlicense executable.
 * @param {string} repoRoot - Absolute repo root path.
 * @param {string[]} files - Repo-relative file paths.
 * @param {number} batchSize - Max files per invocation.
 */
function runAddlicense(addlicenseBinary, repoRoot, files, batchSize) {
  for (const batch of chunked(files, batchSize)) {
    spawnSync(addlicenseBinary, ["-l", LICENSE_NAME, "-c", COPYRIGHT_HOLDER, ...batch], {
      cwd: repoRoot,
      stdio: "inherit",
    });
  }
}

/**
 * Main CLI entry point.
 * @param {string[]} argv
 * @returns {number} Exit code.
 */
function main(argv) {
  const args = parseArgs(argv);
  if (args.batchSize <= 0) {
    throw new Error("--batch-size must be greater than zero");
  }

  const repoRoot = findRepoRoot(args.repoRoot);
  const files = listGitVisibleFiles(repoRoot);

  if (args.dryRun) {
    for (const relativePath of files) {
      console.log(relativePath);
    }
    return 0;
  }

  const addlicenseBinary = findAddlicenseBinary();
  runAddlicense(addlicenseBinary, repoRoot, files, args.batchSize);
  console.log(`Updated license headers for ${files.length} files.`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    process.exit(main(process.argv));
  } catch (/** @type {any} */ error) {
    console.error(String(error));
    process.exit(1);
  }
}

export {
  parseArgs,
  findRepoRoot,
  findAddlicenseBinary,
  listGitVisibleFiles,
  shouldIncludePath,
  chunked,
  runAddlicense,
  main,
};
