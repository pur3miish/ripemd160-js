import { deepStrictEqual, ok } from "assert";
import crypto from "crypto";

import ripemd160 from "../ripemd160.js";

it("Ripemd160 message input.", async function () {
  const hash = await ripemd160("the quick brown fox jumps over the lazy dog");
  const native_hash = crypto
    .createHash("ripemd160")
    .update("the quick brown fox jumps over the lazy dog")
    .digest()
    .toString("hex");
  ok(native_hash == hash, "Expected string output");
});

it("Ripemd160 message Uint8Array.", async function () {
  const hash = await ripemd160(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
  const native_hash = new Uint8Array(
    crypto
      .createHash("ripemd160")
      .update(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))
      .digest()
  );
  deepStrictEqual(native_hash, hash, "Expected Uint8Array output");
});

it("Ripemd160 size limit.", async function () {
  const random_buffer = crypto.randomBytes(59);
  const hash = await ripemd160(new Uint8Array(random_buffer));
  const native_node_hash = new Uint8Array(
    crypto
      .createHash("ripemd160")
      .update(new Uint8Array(random_buffer))
      .digest()
  );
  deepStrictEqual(native_node_hash, hash, "random bytes");
});

it("expected Error.", async function () {
  try {
    await ripemd160(crypto.randomBytes(2 ** 17));
  } catch (err) {
    if (err instanceof RangeError) ok(true, "expected range error");
    else throw err;
  }
  try {
    await ripemd160(1);
  } catch (err) {
    if (err instanceof TypeError) ok(true, "expected type error");
    else throw err;
  }
});

it("message length > 65536,", async function () {
  const random_bytes = new Uint8Array(crypto.randomBytes(2 ** 16));
  const random_bytes_b = new Uint8Array(crypto.randomBytes(2 ** 8));
  const random_bytes_c = new Uint8Array(crypto.randomBytes(2 ** 2));

  const compare = async (bytes) => {
    const native_hash = new Uint8Array(
      crypto.createHash("ripemd160").update(bytes).digest()
    );
    const hash = await ripemd160(bytes);
    deepStrictEqual(hash, native_hash);
  };
  compare(random_bytes);
  compare(random_bytes_b);
  compare(random_bytes_c);
});
