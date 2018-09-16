import { Route } from './route';
import { HttpRequestMethod } from './httpRequestMethod.enum';
import { UrlParser } from './url.parser';

export class AppRouter {
    private static routes: Route[] = [];
    static registerRoutes(routes: Route[]) {
        this.routes = routes;
    }

    static findRoute(method: string, url: string): Route {
        const verbMatchedRoutes = this.routes.filter(route => route.method === this.getMethod(method));
        for (const route of verbMatchedRoutes) {
            const urlSegment = UrlParser.getURLSegment(route.url);
            if (url.startsWith(urlSegment)) {
                return route;
            }
        }

        throw `RouteNotFound: ${method} ${url}`;
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
