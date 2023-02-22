"use strict";

const fs = require("fs");

const buffer = fs.readFileSync("ripemd160.wasm");

fs.writeFileSync(
  "ripemd160.json",
  JSON.stringify({
    WASM: buffer.toJSON().data,
  })
);
