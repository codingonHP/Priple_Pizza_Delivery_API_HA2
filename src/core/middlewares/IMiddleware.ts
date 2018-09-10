import { HttpRequest } from '../server/httpRequest';
import { HttpResponse } from '../server/httpResponse';

export interface IMiddleware {
    process(req: HttpRequest, res: HttpResponse): Promise<any>;
    cleanUp(): void;
}
