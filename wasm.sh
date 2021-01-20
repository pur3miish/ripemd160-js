clang --target=wasm32 -nostartfiles --no-standard-libraries -Wl,--export="digest" -Wl,--export="get_ptr" -Wl,--no-entry -o wasm/ripemd160.wasm src/main.c
node ./parse_wasm.js
