import { HttpResponse } from '../core/server/httpResponse';
import { Configuration } from '../configuration/Configuration';

export class ApiController {

    constructor(protected config: Configuration) { }

    created(res: HttpResponse, responseText?: string) {
        res.response.writeHead(201);
        if (responseText) {
            res.response.write(responseText, 'utf-8');
        }
        res.response.end();
    }

    deleted(res: HttpResponse) {
        res.response.writeHead(201);
        res.response.end();
    }

    failed(res: HttpResponse) {
        res.response.writeHead(500);
        res.response.end();
    }

    ok(res: HttpResponse, responseText?: string) {
        res.response.setHeader('Content-Type', 'text/plain');
        res.response.writeHead(200);
        if (responseText) {
            res.response.write(responseText, 'utf-8');
        }
        res.response.end();
    }
}
