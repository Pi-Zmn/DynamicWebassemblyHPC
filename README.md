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
- run `emcc hello_world.c -s INVOKE_RUN=0 -o hello_world.js`
- creates `hello_world.wasm` & `hello_world.js` file
- `hello_world.js` (Gluecode) initializes WASM sandbox environment (Memory, include/import) in wich the `hello_world.wasm` file can be executed
- `INVOKE_RUN=0`prevents execution of 'main()'-function during initiation

## Notes:
- Device IP: `hostname -I`
