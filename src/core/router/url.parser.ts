export class UrlParser {
    static getUrl(url: string): ParsedUrl {
        return null;
    }
}

export class ParsedUrl {
    url: string;
    queryParam: QueryParam[];
}

export class QueryParam {
    key: string;
    value: string;
}
