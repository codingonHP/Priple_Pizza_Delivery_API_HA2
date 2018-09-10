import { ApiController } from './apiController';
import { HttpRequest } from '../core/server/httpRequest';
import { HttpResponse } from '../core/server/httpResponse';

export class HomeController extends ApiController {
    get(req: HttpRequest, res: HttpResponse): void {
        this.ok(res, 'hello world');
    }
}
