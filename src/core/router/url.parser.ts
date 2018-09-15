import { QueryParam } from './query.param';

export class UrlParser {
    static parseUrl(url: string, routeString: string): ParsedUrl {
        const urlsegment = this.getURLSegment(url);
        const urlTokens = url.split('/');
        const routeStringTokens = routeString.split('/');

        if (urlTokens.length !== routeStringTokens.length) {
            throw new SyntaxError('url could not be parsed');
        }

        const queryParamArray: QueryParam[] = [];
        for (let i = 0; i < urlTokens.length; i = i + 1) {
            const urlToken = urlTokens[i];
            if (urlToken && urlToken.startsWith(':')) {
                const queryParam = new QueryParam();
                queryParam.key = urlToken.substring(1);
                queryParam.value = routeStringTokens[i];
                queryParamArray.push(queryParam);
            }
        }

        return new ParsedUrl(urlsegment, queryParamArray);
    }

    static getURLSegment(url: string): string {
        let urlsegment = '';
        const tokens = url.split('/');
        tokens.forEach((token: string) => {
            if (token && !token.startsWith(':')) {
                urlsegment += '/' + token;
            }
        });

        return urlsegment || '/';
    }
}

export class ParsedUrl {
    constructor(public url: string, public queryParam: QueryParam[]) { }
}
