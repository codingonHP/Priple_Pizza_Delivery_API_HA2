import { HttpResponse } from '../core/server/httpResponse';

export class ApiController {
    created(res: HttpResponse, responseText?: string) {
        res.response.writeHead(201);
        if (responseText) {
            res.response.write(responseText, 'utf-8');
        }
        res.response.end();
    }

    failed(res: HttpResponse) {
        res.response.writeHead(500);
        res.response.end();
    }

    ok(res: HttpResponse, responseText?: string) {
        res.response.writeHead(200);
        if (responseText) {
            res.response.write(responseText, 'utf-8');
        }
        res.response.end();
    }
}
