import { IncomingMessage, ServerResponse } from 'http';

import { ApiController } from './apiController';

export class ExceptionController extends ApiController {
    get(req: IncomingMessage, res: ServerResponse): void {
        res.writeHead(500);
        res.end();
    }
}
