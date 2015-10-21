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
/**
 * This file contains all json message API helper functions for carbono.
 *
 * @author Carbono Team
 * @module carbono-json-messages
 */
var uuid = require('node-uuid');

/**
 * Class to create a new JSON message.
 *
 * @param {Object} params - params to create a JSON message.
 * @param {string} params.apiVersion - specify the version.
 * @param {string} [params.id=uuid auto generated] - internal unique message id.
 *
 * @class
 */
var CarbonoJsonMessages = function CarbonoJsonMessages(params) {
    if (!params) {
        throw new Error('No params for CarbonoJsonMessages instantiation.');
    }

    this.apiVersion = params.apiVersion;
    this.id         = params.id || uuid.v4(); // random uuid
    this.method     = params.method || null;
};

/**
 * Set data object on the message.
 * This function should be used to create a success JSON message.
 *
 * @param {Object} data - must be compliant with Google JSON Style Guide.
 * @returns {Object} returns own reference (this).
 *
 * @function
 */
CarbonoJsonMessages.prototype.setData = function (data) {
    this.data = data;

    return this;
};

/**
 * Set error object on the message.
 * This function should be used to create an error JSON message.
 *
 * @param {Object | int} error Accepts error object or error code
 *  - must be compliant with Google JSON Style Guide.
 * @param {string} [error] - contain error code.
 * @param {Object[]} [errors] - must be compliant with Google JSON Style Guide.
 * @returns {Object} returns own reference (this).
 *
 * @function
 */
CarbonoJsonMessages.prototype.setError = function (error, message, errors) {
    if (typeof error === 'object') {
        this.error = error;
    } else {
        this.error = {
            code: error,
            message: message,
            errors: errors,
        };
    }

    return this;
};

/**
 * Returns JSON stringfy for the internal JSON message.
 *
 * @return {Object} json - return generated json message.
 *
 * @function
 */
CarbonoJsonMessages.prototype.toJSON = function () {
    return JSON.stringify(this.toObject());
};

/**
 * Returns Object for the internal JSON message.
 *
 * @return {Object} obhect - return generated object message.
 *
 * @function
 */
CarbonoJsonMessages.prototype.toObject = function () {
    var obj = {
        apiVersion: this.apiVersion,
        id: this.id,
        method: this.method,
        data: this.data,
        error: this.error,
    };

    return obj;
};

module.exports = CarbonoJsonMessages;
