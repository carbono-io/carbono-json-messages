/**
 * The MIT License (MIT)
 * Copyright (c) 2015 Fabrica de Aplicativos S/A
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */
'use strict';

var should = require('chai').should();
var JsonMessages = require('../lib/json-messages.js');

describe('Testator', function () {
    describe('create a valid message', function () {
        it('common using version 1.0', function () {
            var resp = new JsonMessages({apiVersion: '1.0'});
            resp.setData(
                {
                    id: '1234',
                    items: [{foo: 'bar'}],
                }
            );
            var json = JSON.parse(resp.toJSON());

            should.exist(json.apiVersion, 'json.apiVersion');
            json.apiVersion
                .should.be.equals('1.0');

            should.exist(json.id, 'json.id');
            json.id
                .should.have.length(36, 'json.id');
            should.exist(json.id, 'json.id');
            json.id
                .should.have.length(36, 'json.id');
            should.exist(json.data, 'json.data');
            should.exist(json.data.id, 'json.data.id');
            json.data.id
                .should.be.equals('1234');
            should.exist(json.data.items, 'json.data.items');
            json.data.items
                .should.have.length(1);
            should.exist(json.data.items[0].foo, 'json.data.items[0].foo');
            json.data.items[0].foo
                .should.be.equals('bar');
        });

        it('customizing message id', function () {
            var resp = new JsonMessages({id: '987', apiVersion: '1.0'});
            resp.setData(
                {
                    id: '1234',
                    items: [{foo: 'bar'}],
                }
            );
            var json = JSON.parse(resp.toJSON());

            should.exist(json.id, 'json.id');
            json.id
                .should.be.equals('987');
        });

        it('setting method field', function () {
            var method = 'Baz';
            var resp = new JsonMessages({apiVersion: '1.0', method: method});
            resp.setData(
                {
                    id: '1234',
                    items: [{foo: 'bar'}],
                }
            );
            var json = JSON.parse(resp.toJSON());

            should.exist(json.method, 'json.method');
            json.method
                .should.be.equals(method);
        });

        it('generate an simple error message using JSON', function () {
            var resp = new JsonMessages({id: '987', apiVersion: '1.0'});
            resp.setError(
                {
                    code: 404,
                    message: 'useful message',
                }
            );
            var json = JSON.parse(resp.toJSON());

            should.exist(json.error, 'json.error');
            should.exist(json.error.code, 'json.error.code');
            json.error.code
                .should.be.equals(404);
            should.exist(json.error.message, 'json.error.message');
            json.error.message
                .should.be.equals('useful message');
        });

        it('generate an error message using JSON containing error list',
            function () {
                var resp = new JsonMessages({id: '987', apiVersion: '1.0'});
                resp.setError(
                    {
                        code: 404,
                        message: 'useful message',
                        errors: [
                            {
                                domain: 'test',
                                reason: 'reason 1',
                                message: 'useful message 1',
                            },
                            {
                                domain: 'test',
                                reason: 'reason 2',
                                message: 'useful message 2',
                            },
                        ],
                    }
                );
                var json = JSON.parse(resp.toJSON());

                should.exist(json.error, 'json.error');
                should.exist(json.error.errors, 'json.error.errors');
                json.error.errors
                    .should.have.length(2);

                should.exist(json.error.errors[0].domain,
                    'json.error.errors[0].domain');
                should.exist(json.error.errors[0].reason,
                    'json.error.errors[0].reason');
                should.exist(json.error.errors[0].message,
                    'json.error.errors[0].message');
                json.error.errors[0].domain
                    .should.be.equals('test');
                json.error.errors[0].reason
                    .should.be.equals('reason 1');
                json.error.errors[0].message
                    .should.be.equals('useful message 1');
                json.error.errors[1].domain
                    .should.be.equals('test');
                json.error.errors[1].reason
                    .should.be.equals('reason 2');
                json.error.errors[1].message
                    .should.be.equals('useful message 2');
            });

        it('generate an error message using parameters containing error list',
            function () {
                var resp = new JsonMessages({id: '987', apiVersion: '1.0'});
                resp.setError(4000, 'useful message x',
                    [
                        {
                            domain: 'test param',
                            reason: 'reason a',
                            message: 'useful message a',
                        },
                        {
                            domain: 'test param',
                            reason: 'reason b',
                            message: 'useful message b',
                        },
                    ]
                );
                var json = JSON.parse(resp.toJSON());

                should.exist(json.error, 'json.error');
                should.exist(json.error.errors, 'json.error.errors');
                json.error.errors
                    .should.have.length(2);

                should.exist(json.error.errors[0].domain,
                    'json.error.errors[0].domain');
                should.exist(json.error.errors[0].reason,
                    'json.error.errors[0].reason');
                should.exist(json.error.errors[0].message,
                    'json.error.errors[0].message');
                json.error.errors[0].domain
                    .should.be.equals('test param');
                json.error.errors[0].reason
                    .should.be.equals('reason a');
                json.error.errors[0].message
                    .should.be.equals('useful message a');
                json.error.errors[1].domain
                    .should.be.equals('test param');
                json.error.errors[1].reason
                    .should.be.equals('reason b');
                json.error.errors[1].message
                    .should.be.equals('useful message b');
            });

        it('invalid usage of Constructor - without params', function () {
            (function () {
                new JsonMessages();
            }).should.throw();
        });

        it('object using version 1.0', function () {
            var resp = new JsonMessages({apiVersion: '1.0'});
            resp.setData(
                {
                    id: '1234',
                    items: [{foo: 'bar'}],
                }
            );
            var json   = JSON.parse(resp.toJSON());
            var object = resp.toObject();

            json.id.should.be.equals(object.id);
            json.apiVersion.should.be.equals(object.apiVersion);
            json.data.id.should.be.equals(object.data.id);
            json.data.items[0].foo.should.be.equals(object.data.items[0].foo);
        });
    });
});
