export class BaseException extends Error {
    constructor(message,statuscode) {
        super(message);
        this.isException = true;
        this.statuscode = statuscode;
    }
}