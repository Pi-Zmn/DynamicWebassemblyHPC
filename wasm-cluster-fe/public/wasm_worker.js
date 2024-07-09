// web worker

let myModule;

self.onmessage = async function(event) {
    const { eventType, eventData, eventId } = event.data;
    switch (eventType) {
        case 'INIT':
            /* Load Wasm File */
            const wasm = await fetch('http://localhost:8000/hello_world.wasm')
            if (!wasm.ok) {
                console.log('Unable to Load Wasm Script')
                break;
            }
            const wasm_binary = await wasm.arrayBuffer();

            /* Load and Execute Glue Code */
            try {
                await self.importScripts('http://localhost:8000/hello_world.js')
                myModule = await GlueCode({
                    wasmBinary: wasm_binary
                });
                console.log('Successfully instantiated WASM Module');
            } catch (e) {
                console.log('Unable to Load Gluecode Script')
                console.log(e)
            }
            break;
        case 'MUL':
            if (myModule) {
                /* Execute Wasm-main with Input Args */
                const result = myModule.callMain(['hi', 'test', '42'])
                self.postMessage(result);
            } else {
                console.log('No WASM Module was instantiated');
            }
            break;
        default:
            console.log('Work cant process given Event')
    }
};
