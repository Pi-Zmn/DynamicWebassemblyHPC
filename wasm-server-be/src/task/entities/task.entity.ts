export class Task {
    id: number; //TODO id unnecessary ? (Array Index)
    jobId: number;
    input: any;
    result: any;
    scheduled: undefined | Date;
    finished: boolean;
}
