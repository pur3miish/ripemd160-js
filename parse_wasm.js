'use strict'

const fs = require('fs')

const buffer = fs.readFileSync('wasm/ripemd160.wasm')

fs.writeFileSync(
  'private/ripemd160.json',
  JSON.stringify({
    WASM: buffer.toJSON().data
  })
)
