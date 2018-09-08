import { IncomingMessage, ServerResponse } from 'http';

import { ApiController } from './apiController';

export class NotFoundController extends ApiController {
    get(req: IncomingMessage, res: ServerResponse): void {
        res.writeHead(404);
        res.end();
    }
}
