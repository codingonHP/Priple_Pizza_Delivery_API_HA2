import { HttpRequestMethod } from './httpRequestMethod.enum';

export class Route {
    constructor(
        public method: HttpRequestMethod,
        public url: string,
        public controller: string,
    ) { }
}

export class ExceptionRoute {
    constructor (public statusCode: number, public controller: string) { }
}
