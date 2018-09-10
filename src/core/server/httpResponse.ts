import { ServerResponse } from 'http';

export class HttpResponse {
    constructor(public response: ServerResponse) { }
}
