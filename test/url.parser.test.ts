import 'jest';
import chai from 'chai';

import { UrlParser } from '../src/core/router/url.parser';

describe('UrlParser Test', () => {
    describe('#parseUrl', () => {
        describe('when invoked with a url with no query params', () => {
            it('should return ParsedUrl instance with url as original url set', () => {
                // Act
                const parsedUrl = UrlParser.parseUrl('/api/users', '/api/users');

                // Assert
                chai.assert.equal(parsedUrl.url, '/api/users');
                chai.assert.equal(parsedUrl.queryParam.length, 0);
            });
        });

        describe('when invoked with url with query parameter', () => {
            it('should return ParsedUrl instance with url as original url and QueryParam set', () => {
                // Act
                let parsedUrl = UrlParser.parseUrl('/api/users/:id', '/api/users/123456');

                // Assert
                chai.assert.equal(parsedUrl.url, '/api/users');
                chai.assert.equal(parsedUrl.queryParam.length, 1);
                chai.assert.equal(parsedUrl.queryParam[0].key, 'id');
                chai.assert.equal(parsedUrl.queryParam[0].value, '123456');

                // Act
                parsedUrl = UrlParser.parseUrl('/api/users/:id/:name', '/api/users/123456/test');

                // Assert
                chai.assert.equal(parsedUrl.url, '/api/users');
                chai.assert.equal(parsedUrl.queryParam.length, 2);
                chai.assert.equal(parsedUrl.queryParam[0].key, 'id');
                chai.assert.equal(parsedUrl.queryParam[0].value, '123456');
                chai.assert.equal(parsedUrl.queryParam[1].key, 'name');
                chai.assert.equal(parsedUrl.queryParam[1].value, 'test');
            });
        });

        describe('when invoked with mismatched query string',  () => {
            it('should throw error', () => {
                chai.assert.throws(() => UrlParser.parseUrl('/api/users/:id', '/api/users/123456/test'), SyntaxError, 'url could not be parsed');
            });
        });
    });

    describe('#getURLSegment', () => {
        describe('when invoked with url value', () => {

            it('should return same url if no query params are present', () => {
                // Act
                const urlPart = UrlParser.getURLSegment('/api/work');

                // Assert
                chai.assert.equal(urlPart, '/api/work');
            });

            it('should remove all the query params and return only url segment', () => {
                // Act
                const urlPart = UrlParser.getURLSegment('/api/users/:id/:name');

                // Assert
                chai.assert.equal(urlPart, '/api/users');
            });

            it('should return "/" if url is "/"', () => {
                // Act
                const urlPart = UrlParser.getURLSegment('/');

                // Assert
                chai.assert.equal(urlPart, '/');
            });
        });
    });
});
