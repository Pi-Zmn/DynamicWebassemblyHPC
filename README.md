# DynamicWebassemblyHPC
This Project provides a Dynamic High Performance Computing Network

## Frontend (Next.Js)
- Port: 4000
- Run Dev: `npm run dev`
- Run Dep: `npm run start`

## Backend (Nest.Js)
- Port: 3000
- Run Dev: `npm run start:dev`
- Run Dep: `npm start`
- Build: `npm build`
- Prod: `npm run start:prod`

## Database (Postgres)
- Port: 5432
- Run: `docker compose up`

## Build Wasm
- Install `emcc` from Emscripten
- Create Target File (.c .cpp .go etc.)
- run `emcc hello_world.c -O2 -sMODULARIZE=1 -sEXPORT_NAME='GlueCode' -sENVIRONMENT=worker -sINVOKE_RUN=0 -sEXPORTED_RUNTIME_METHODS='["callMain"]' -o hello_world.js --closure 1`
- creates `hello_world.wasm` & `hello_world.js` file
- `hello_world.js` (Gluecode) initializes WASM sandbox environment (Memory, include/import) in wich the `hello_world.wasm` file can be executed
- - `-O2` & `--closure 1` heavely reduce the size of bouth generated files
- - `MODULARIZE=1` makes the Gluecode a callable function. Important: this functions takes the generated wasmbinary as optional input Argument. This seems to be the only way to combine `hello_world.wasm` & `hello_world.js` in the browser when loaded from a third party like the backend!
- - `EXPORT_NAME='GlueCode'` sets the name of the initiation function generated by `MODULARIZE=1`. The frontend expects the value `GlueCode` here
- - `ENVIRONMENT=worker` sets the expected environment. Webassembly code is executed in a Webworker.
- - `INVOKE_RUN=0`prevents execution of 'main()'-function during initiation
- - `EXPORTED_RUNTIME_METHODS='["callMain"]'` makes the function `GlueCode.callMain()` callable and accepts input arguments (like argc & argv)

## Notes:
- Device IP: `hostname -I`
