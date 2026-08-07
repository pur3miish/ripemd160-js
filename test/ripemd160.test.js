import { deepStrictEqual, equal, throws, ok, doesNotThrow } from "node:assert";
import crypto from "node:crypto";
import { ripemd160 } from "../dist/index.js";
import vm from "node:vm";

const encoder = new TextEncoder();

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function nativeRipemd160(input) {
  return new Uint8Array(crypto.createHash("ripemd160").update(input).digest());
}

function compare(input) {
  const expected = nativeRipemd160(input);
  const actual = ripemd160(input);

  deepStrictEqual(actual, expected);
}

describe("ripemd160", function () {
  describe("known test vectors", function () {
    const vectors = [
      ["", "9c1185a5c5e9fc54612808977ee8f548b2258d31"],
      ["a", "0bdc9d2d256b3ee9daae347be6f4dc835a467ffe"],
      ["abc", "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"],
      ["message digest", "5d0689ef49d2fae572b881b123a85ffa21595f36"],
      [
        "abcdefghijklmnopqrstuvwxyz",
        "f71c27109c692c1b56bbdceb5b9d2865b3708dbc",
      ],
      [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        "b0e20b6e3116640286ed3a87a5713079b21f5189",
      ],
      [
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "9b752e45573d4b39f4dbd3323cab82bf63326bfb",
      ],
    ];

    for (const [message, expected] of vectors) {
      it(`hashes known vector ${JSON.stringify(message)}`, function () {
        const input = encoder.encode(message);
        const digest = ripemd160(input);

        equal(toHex(digest), expected);
      });
    }
  });

  it("accepts Uint8Array from another realm", function () {
    const context = vm.createContext({});

    const foreignInput = vm.runInContext(
      "new Uint8Array([1, 2, 3, 4, 5])",
      context,
    );

    // Demonstrates why instanceof is unsuitable.
    deepStrictEqual(foreignInput instanceof Uint8Array, false);

    doesNotThrow(() => {
      ripemd160(foreignInput);
    });
  });

  it("returns exactly 20 bytes", function () {
    const digest = ripemd160(encoder.encode("hello"));

    ok(digest instanceof Uint8Array);
    equal(digest.length, 20);
  });

  it("handles empty input", function () {
    compare(new Uint8Array());
  });

  it("handles arbitrary binary input", function () {
    compare(new Uint8Array([0x00, 0xff, 0x80, 0x7f, 0x01, 0xfe, 0x42]));
  });

  describe("padding boundaries", function () {
    const sizes = [
      54, 55, 56, 57, 62, 63, 64, 65,

      118, 119, 120, 121, 126, 127, 128, 129,
    ];

    for (const size of sizes) {
      it(`hashes ${size} bytes`, function () {
        const input = Uint8Array.from(
          { length: size },
          (_, i) => (i * 31 + 17) & 0xff,
        );

        compare(input);
      });
    }
  });

  it("handles large messages", function () {
    const input = Uint8Array.from(
      { length: 2 ** 16 },
      (_, i) => (i * 17 + 29) & 0xff,
    );

    compare(input);
  });

  it("handles messages larger than the old 65536-byte limit", function () {
    const input = Uint8Array.from(
      { length: 2 ** 17 },
      (_, i) => (i * 13 + 7) & 0xff,
    );

    compare(input);
  });

  it("handles a Uint8Array subarray", function () {
    const underlying = new Uint8Array([99, 1, 2, 3, 4, 5, 88]);

    const input = underlying.subarray(1, 6);

    compare(input);
  });

  it("does not modify the input", function () {
    const input = new Uint8Array([1, 2, 3, 4, 5, 6]);

    const original = input.slice();

    ripemd160(input);

    deepStrictEqual(input, original);
  });

  it("returns a new digest on each call", function () {
    const input = encoder.encode("hello");

    const first = ripemd160(input);
    const second = ripemd160(input);

    deepStrictEqual(first, second);

    first[0] ^= 0xff;

    // Mutating one returned digest must not affect another.
    deepStrictEqual(second, ripemd160(input));
  });

  it("rejects non-Uint8Array input", function () {
    throws(() => ripemd160("hello"), TypeError);

    throws(() => ripemd160(123), TypeError);

    throws(() => ripemd160(null), TypeError);

    throws(() => ripemd160([1, 2, 3]), TypeError);
  });

  it("matches Node across many input lengths", function () {
    for (let size = 0; size <= 1024; size++) {
      const input = Uint8Array.from(
        { length: size },
        (_, i) => ((i * 1103515245 + size * 12345) >>> 16) & 0xff,
      );

      compare(input);
    }
  });

  it("hashes one million 'a' bytes", function () {
    const input = new Uint8Array(1_000_000);
    input.fill(0x61);

    const digest = ripemd160(input);

    equal(toHex(digest), "52783243c1697bdbe16d37f97f68f08325dc1528");
  });

  it("Ripemd160 message input.", async function () {
    const msg = "the quick brown fox jumps over the lazy dog";

    const hash = ripemd160(new TextEncoder().encode(msg));
    const native_hash = Uint8Array.from(
      crypto
        .createHash("ripemd160")
        .update("the quick brown fox jumps over the lazy dog")
        .digest(),
    );

    deepStrictEqual(native_hash, hash, "Expected Uint8Array output");
  });
});
