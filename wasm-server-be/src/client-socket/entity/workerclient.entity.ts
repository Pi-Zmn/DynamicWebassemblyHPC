export interface WorkerClient {
    id: string;
    info: ClientInfo | undefined;
}

// TODO: Use User Agent Info here
export interface ClientInfo {
    ua: "",
    browser: {},
    engine: {},
    os: {},
    device: {},
    cpu: {}
}