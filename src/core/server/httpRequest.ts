import { IncomingMessage } from 'http';

export class HttpRequest {
    body: any;
    constructor(public request: IncomingMessage) { }
}
