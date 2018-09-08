import { Route, ExceptionRoute } from './route';
import { HttpRequestMethod } from './httpRequestMethod.enum';

export class AppRouter {
    private static routes: Route[] = [];
    private static exceptionRoutes: ExceptionRoute[] = [];
    static registerRoutes(routes: Route[], exceptionRoutes: ExceptionRoute[]) {
        this.routes = routes;
        this.exceptionRoutes = exceptionRoutes;
    }

    static findRoute(method: string, url: string): Route {
        const foundRoute = this.routes.find(route => route.method === this.getMethod(method) && route.url === url);
        return foundRoute;
    }

    static findExceptionHandlerRoute(statusCode: number) {
        const errHandlerRoute = this.exceptionRoutes.find(route => route.statusCode === statusCode);
        if (!errHandlerRoute) {
            return null;
        }
        return errHandlerRoute;
    }

    private static getMethod(method: string): HttpRequestMethod {
        switch (method.toUpperCase()) {
            case 'GET':
                return HttpRequestMethod.GET;
            case 'POST':
                return HttpRequestMethod.POST;
            case 'PUT':
                return HttpRequestMethod.PUT;
            case 'PATCH':
                return HttpRequestMethod.PATCH;
            case 'DELETE':
                return HttpRequestMethod.DELETE;
        }
    }
}
