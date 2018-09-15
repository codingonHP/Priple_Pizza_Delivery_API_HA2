import { Route } from '../core/router/route';
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
    },
    {
        url: '/api/users/:id',
        method: HttpRequestMethod.DELETE,
        controller: 'user.controller',
        middlewares: [new RequestPayloadMiddleware()],
    },
    ];
}
