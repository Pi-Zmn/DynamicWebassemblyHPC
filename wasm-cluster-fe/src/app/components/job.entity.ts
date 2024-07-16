/* Job.Status from Backend */
export enum Status {
    PENDING,
    ACTIVE,
    RUNNING,
    STOPPED,
    DONE,
    NOT_FOUND
}

/* Job.Language from Backend */
export enum Language {
    C_CPP,
    GO,
    NOT_FOUND
}

/* JobDTO from Banckend */
export interface Job {
    id: number;
    name: string;
    status: Status;
    progress: number;
    totalTasks: number;
    taskBatchSize: number;
    taskTimeOut: number;
    language: Language;
    //wasm: string;
    //finalResult?: any;
}
