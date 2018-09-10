import { Route } from './route';
import { HttpRequestMethod } from './httpRequestMethod.enum';

export class AppRouter {
    private static routes: Route[] = [];
    static registerRoutes(routes: Route[]) {
        this.routes = routes;
    }

    static findRoute(method: string, url: string): Route {
        const foundRoute = this.routes.find(route => route.method === this.getMethod(method) && route.url === url);
        return foundRoute;
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
