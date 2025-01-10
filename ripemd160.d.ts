/**
 * Performs the message digest algorithm RIPEMD160 on input data.
 * @param message Data to hash (either a string or a Uint8Array).
 * @returns A Promise that resolves to either a hex string (if the input was a string) or a Uint8Array (if the input was a Uint8Array).
 * @example
 * // Example usage with string input:
 * ripemd160('hello').then(console.log);
 * // Output: "108f07b8382412612c048d07d13f814118445acd"
 *
 * @example
 * // Example usage with Uint8Array input:
 * const print_hex = array => Buffer.from(array).toString('hex');
 * ripemd160(new Uint8Array([1, 2, 3])).then(print_hex);
 * // Output: "79f901da2609f020adadbf2e5f68a16c8c3f7d57"
 */
export default function ripemd160(
  message: string | Uint8Array
): Promise<string | Uint8Array>;
