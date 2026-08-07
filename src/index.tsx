"use strict";

export function ripemd160(input: Uint8Array): Uint8Array {
  const zl: readonly number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
    15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13,
    11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9,
    7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
  ];

  const zr: readonly number[] = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5,
    10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10,
    0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10,
    4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
  ];

  const sl: readonly number[] = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9,
    7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13,
    6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9,
    15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
  ];

  const sr: readonly number[] = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8,
    9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14,
    13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5,
    12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
  ];

  const hl: readonly number[] = [
    0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e,
  ];

  const hr: readonly number[] = [
    0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000,
  ];

  const rotl = (x: number, n: number): number => (x << n) | (x >>> (32 - n));

  const f1 = (x: number, y: number, z: number): number => x ^ y ^ z;

  const f2 = (x: number, y: number, z: number): number => (x & y) | (~x & z);

  const f3 = (x: number, y: number, z: number): number => (x | ~y) ^ z;

  const f4 = (x: number, y: number, z: number): number => (x & z) | (y & ~z);

  const f5 = (x: number, y: number, z: number): number => x ^ (y | ~z);

  type RoundFunction = (x: number, y: number, z: number) => number;

  const fn = (
    f: RoundFunction,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    m: number,
    k: number,
    s: number
  ): number => (rotl((a + f(b, c, d) + m + k) | 0, s) + e) | 0;

  // Padding
  const length = input.length;
  const paddedLength = Math.ceil((length + 9) / 64) * 64;

  const data = new Uint8Array(paddedLength);
  data.set(input);

  data[length] = 0x80;

  // 64-bit message length in bits, little-endian
  const bitLengthLo = (length * 8) >>> 0;
  const bitLengthHi = Math.floor(length / 0x20000000) >>> 0;

  const end = paddedLength - 8;

  data[end] = bitLengthLo & 0xff;
  data[end + 1] = (bitLengthLo >>> 8) & 0xff;
  data[end + 2] = (bitLengthLo >>> 16) & 0xff;
  data[end + 3] = (bitLengthLo >>> 24) & 0xff;

  data[end + 4] = bitLengthHi & 0xff;
  data[end + 5] = (bitLengthHi >>> 8) & 0xff;
  data[end + 6] = (bitLengthHi >>> 16) & 0xff;
  data[end + 7] = (bitLengthHi >>> 24) & 0xff;

  // Initial state
  let h0 = 0x67452301 | 0;
  let h1 = 0xefcdab89 | 0;
  let h2 = 0x98badcfe | 0;
  let h3 = 0x10325476 | 0;
  let h4 = 0xc3d2e1f0 | 0;

  const words = new Int32Array(16);

  // Process 64-byte blocks
  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let j = 0; j < 16; j++) {
      const i = offset + j * 4;

      words[j] =
        data[i] |
        (data[i + 1] << 8) |
        (data[i + 2] << 16) |
        (data[i + 3] << 24);
    }

    let al = h0;
    let bl = h1;
    let cl = h2;
    let dl = h3;
    let el = h4;

    let ar = h0;
    let br = h1;
    let cr = h2;
    let dr = h3;
    let er = h4;

    for (let i = 0; i < 80; i++) {
      let tl: number;
      let tr: number;

      if (i < 16) {
        tl = fn(f1, al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i]);

        tr = fn(f5, ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i]);
      } else if (i < 32) {
        tl = fn(f2, al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i]);

        tr = fn(f4, ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i]);
      } else if (i < 48) {
        tl = fn(f3, al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i]);

        tr = fn(f3, ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i]);
      } else if (i < 64) {
        tl = fn(f4, al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i]);

        tr = fn(f2, ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i]);
      } else {
        tl = fn(f5, al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i]);

        tr = fn(f1, ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i]);
      }

      al = el;
      el = dl;
      dl = rotl(cl, 10);
      cl = bl;
      bl = tl;

      ar = er;
      er = dr;
      dr = rotl(cr, 10);
      cr = br;
      br = tr;
    }

    const t = (h1 + cl + dr) | 0;

    h1 = (h2 + dl + er) | 0;
    h2 = (h3 + el + ar) | 0;
    h3 = (h4 + al + br) | 0;
    h4 = (h0 + bl + cr) | 0;
    h0 = t;
  }

  // Produce 20-byte digest
  const output = new Uint8Array(20);
  const state = [h0, h1, h2, h3, h4];

  for (let i = 0; i < 5; i++) {
    const value = state[i];
    const offset = i * 4;

    output[offset] = value & 0xff;
    output[offset + 1] = (value >>> 8) & 0xff;
    output[offset + 2] = (value >>> 16) & 0xff;
    output[offset + 3] = (value >>> 24) & 0xff;
  }

  return output;
}
