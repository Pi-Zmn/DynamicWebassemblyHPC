// web worker

let myModule;

self.onmessage = async function(event) {
    const { eventType, eventData } = event.data;
    switch (eventType) {
        case 'INIT':
            /* Load Wasm File */
            const wasm = await fetch(eventData + '.wasm')
            if (!wasm.ok) {
                console.log('Unable to Load Wasm Script')
                break;
            }
            const wasm_binary = await wasm.arrayBuffer();

            /* Load and Execute Glue Code */
            try {
                await self.importScripts(eventData + '.js')
                myModule = await GlueCode({
                    wasmBinary: wasm_binary
                });
                console.log('Successfully instantiated WASM Module');
                self.postMessage({
                    eventType: eventType,
                    eventData: true
                });
            } catch (e) {
                console.log('Unable to Load Gluecode Script')
                console.log(e)
            }
            break;
        case 'RUN':
            if (myModule) {
                const startTime = performance.now();
                let task = eventData
                console.log(task.input)
                /* Execute Wasm-main with Input Args */
                task.result = await myModule.callMain(task.input)
                console.log(task.result)
                const endTime = performance.now();
                console.log(`Execution time: ${endTime - startTime} ms`);
                task.done = true
                task.runTime = endTime - startTime
                self.postMessage({
                    eventType: eventType,
                    eventData: task
                });
            } else {
                console.log('No WASM Module was instantiated');
            }
            break;
        default:
            console.log('Work cant process given Event')
    }
};
