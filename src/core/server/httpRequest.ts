import { IncomingMessage } from 'http';
import { QueryParam } from '../router/query.param';

export class HttpRequest {
    body: any;
    query: QueryParam[] = [];
    constructor(public request: IncomingMessage) { }
}
