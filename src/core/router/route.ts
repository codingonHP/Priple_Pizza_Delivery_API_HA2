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

export class ExceptionRoute {
    constructor (
        public statusCode: number,
        public controller: string,
        public middlewares: IMiddleware[],
    ) { }
}
