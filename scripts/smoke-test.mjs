import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

let tempDir;
let tarball;

try {
  // Build an actual npm package tarball.
  const packOutput = execFileSync(npm, ["pack", "--json"], {
    encoding: "utf8",
  });

  const packResult = JSON.parse(packOutput);
  tarball = resolve(packResult[0].filename);

  console.log(`Packed: ${tarball}`);

  // Create a clean consumer project.
  tempDir = mkdtempSync(join(tmpdir(), "ripemd160-js-smoke-"));

  writeFileSync(
    join(tempDir, "package.json"),
    JSON.stringify(
      {
        private: true,
        type: "module",
      },
      null,
      2,
    ),
  );

  // Install exactly the tarball npm would publish.
  execFileSync(
    npm,
    ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball],
    {
      cwd: tempDir,
      stdio: "inherit",
    },
  );

  // Create a consumer test.
  writeFileSync(
    join(tempDir, "test.mjs"),
    `
import { ripemd160 } from "ripemd160-js";

const input = new TextEncoder().encode("abc");

const digest = ripemd160(input);

const hex = Array.from(
  digest,
  byte => byte.toString(16).padStart(2, "0")
).join("");

const expected =
  "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc";

if (!(digest instanceof Uint8Array)) {
  throw new Error("Expected Uint8Array output");
}

if (digest.length !== 20) {
  throw new Error(
    \`Expected 20-byte digest, got \${digest.length}\`
  );
}

if (hex !== expected) {
  throw new Error(
    \`Incorrect digest: \${hex}\`
  );
}

console.log("✓ package import works");
console.log("✓ Uint8Array output works");
console.log("✓ RIPEMD-160 digest is correct");
`,
  );

  execFileSync(process.execPath, ["test.mjs"], {
    cwd: tempDir,
    stdio: "inherit",
  });

  console.log("✓ npm package smoke test passed");
} finally {
  if (tempDir) {
    rmSync(tempDir, {
      recursive: true,
      force: true,
    });
  }

  if (tarball) {
    try {
      unlinkSync(tarball);
    } catch {
      // Ignore cleanup failure.
    }
  }
}
