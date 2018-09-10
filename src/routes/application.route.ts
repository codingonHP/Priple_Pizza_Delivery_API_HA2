import { Route, ExceptionRoute } from '../core/router/route';
import { HttpRequestMethod } from '../core/router/httpRequestMethod.enum';
import { RequestPayloadMiddleware } from '../core/middlewares/requestPayload.middleware';

export class ApplicationRoutes {
    public static APP_ROUTES: Route[] = [{
        url: '/',
        method: HttpRequestMethod.GET,
        controller: 'home.controller',
        middlewares: [],
    },
    {
        url: '/api/users',
        method: HttpRequestMethod.POST,
        controller: 'user.controller',
        middlewares: [new RequestPayloadMiddleware()],
    }];

    public static APP_EXCEPTION_ROUTES: ExceptionRoute[] = [{
        statusCode: 404,
        controller: 'notFound.controller',
        middlewares: [],
    },
    {
        statusCode: 500,
        controller: 'exception.controller',
        middlewares: [],
    }];
}
