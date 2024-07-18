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
    startTime: Date | null;
    endTime: Date | null;
    runTimeMS: number;
    //wasm: string;
    //finalResult?: any;
}

export interface ActiveJob extends Job {
    status: Status;
    tasks: Task[];
}

/* Task Entity Backend */
export interface Task {
    id: number;
    jobId: number;
    timeOut: number;
    scheduledAt: undefined | Date;
    done: boolean;
    runTime: undefined | number;
    input: string[];
    result: any;
}
