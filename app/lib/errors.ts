import { ErrorDetail } from "./types";


export default class ErrorWithDetail extends Error {
    detail: ErrorDetail[];

    constructor(message: string, detail: any){
        super(message);
        this.detail = detail;
    }
}