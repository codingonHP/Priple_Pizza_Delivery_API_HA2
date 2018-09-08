import { Route, ExceptionRoute } from '../core/router/route';
import { HttpRequestMethod } from '../core/router/httpRequestMethod.enum';

export class ApplicationRoutes {
    public static APP_ROUTES: Route[] = [{
        url: '/',
        method: HttpRequestMethod.GET,
        controller: 'home.controller',
    },
    {
        url: '/api/users',
        method: HttpRequestMethod.POST,
        controller: 'user.controller',
    }];

    public static APP_EXCEPTION_ROUTES: ExceptionRoute[] = [{
        statusCode: 404,
        controller: 'notFound.controller',
    },
    {
        statusCode: 500,
        controller: 'exception.controller',
    }];
}
