import { HttpRequestMethod } from './httpRequestMethod.enum';
import { IMiddleware } from '../middlewares/IMiddleware';

export class Route {
    constructor(
        public method: HttpRequestMethod,
        public url: string,
        public controller: string,
        public middlewares: IMiddleware[],
    ) { }
}
