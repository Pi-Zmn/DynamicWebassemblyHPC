import {IResult} from 'ua-parser-js';

export interface Client {
    id: string;
    info: IResult;
}
