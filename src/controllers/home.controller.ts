import { IncomingMessage, ServerResponse } from 'http';

import { ApiController } from './apiController';

export class HomeController extends ApiController {
    get(req: IncomingMessage, res: ServerResponse): void {
        res.writeHead(200);
        res.write('hello world', 'utf-8');
        res.end();
    }
}
