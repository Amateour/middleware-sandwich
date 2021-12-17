'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const admixtures = {
    get(key, notInherited) {
        if (notInherited)
            return this[key];
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            return this[key];
        }
    },
    has(key, notInherited) {
        if (notInherited)
            return !!this[key];
        return Object.prototype.hasOwnProperty.call(this, key);
    },
    size() {
        return Array.isArray(this) ? this.length : Object.keys(this).length;
    },
    map(callback) {
        return new Promise((resolve) => {
            const length = Array.isArray(this) ? this.length : Object.keys(this).length, data = new Array(length);
            let index = -1;
            for (const key in this) {
                ++index;
                const element = this[key];
                data[index] = callback(element, key, this);
                if (index === length - 1) {
                    resolve(data);
                }
            }
        });
    },
    filter(callback) {
        return new Promise((resolve) => {
            const length = Array.isArray(this) ?
                this.length : Object.keys(this).length, data = [];
            let index = -1;
            for (const key in this) {
                ++index;
                const element = this[key];
                if (callback(element, key, this)) {
                    data.push(element);
                }
                if (index === length - 1) {
                    resolve(data);
                }
            }
        });
    },
    omit(arrayKeys) {
        return new Promise((resolve) => {
            const length = arrayKeys.length;
            for (let i = 0; i < length; i++) {
                delete this[arrayKeys[i]];
                if (i === length)
                    resolve(this);
            }
        });
    },
    find(callback) {
        return new Promise((resolve) => {
            for (const key in this) {
                const element = this[key];
                if (callback(element, key, this)) {
                    resolve(this[key]);
                }
            }
        });
    },
    flatten(level = 1) {
        let levelCount = 1;
        function flattenDeep(arr1) {
            return __awaiter(this, void 0, void 0, function* () {
                return arr1.reduce((acc, val) => Array.isArray(val) && ++levelCount <= level ?
                    acc.concat(flattenDeep(val)) : acc.concat(val), []);
            });
        }
        return new Promise((resolve) => {
            resolve(flattenDeep(this));
        });
    }
};
const filter = (value, callback) => {
    return admixtures.filter.call(value, callback);
};
const flatten = (value, level = 1) => {
    return admixtures.flatten.call(value, level);
};

/**
 * Identify if it is running in a browser
 */
const isBrowser = () => typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]';
/**
 * Identify if it is running in a nodejs
 */
const isNode = () => typeof global !== "undefined"
    && ({}).toString.call(global) === '[object global]';
/**
 * validate if it is an array
 *
 * @param elm - element validation
 * @returns boolean
 */
function isArray(elm) {
    return Array.isArray(elm);
}
/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
function isObject(elm) {
    return elm instanceof Object;
}
/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
function isString(elm) {
    return typeof elm === "string";
}
/**
 * validate if it is an number
 *
 * @param elm - element validation
 * @returns boolean
 */
function isNumber(elm) {
    return typeof elm === "number";
}
/**
 * Functions validations (isArray, isString)
 *
 */
const validate = {
    Array: isArray,
    String: isString,
    Number: isNumber,
    Object: isObject,
    Browser: isBrowser,
    Node: isNode
};
/**
 * get_middlewares Middleware extraction, can be an array of function objects or an object
 *
 * @example
 * Array functions
 * Sandwich.handler(Users, [isAuth])
 *
 * Array objects
 * ```ts
 * Sandwich.handler(Users, [
 * {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * }
 *])
 *```
 *
 *```ts
 * objects
 * Sandwich.handler(Users, {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * })
 * ```
 *
 * @remarks
 * The extraction of each middleware is selected according to the method of the http request
 *
 * @param middlewares - list middlewares
 * @param method - method request (post, get)
 */
function getMiddlewares(middlewares, method) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let isFlatten = false;
            if (!(typeof middlewares === 'object'))
                return middlewares;
            const resp_middlewares = yield filter(middlewares, (middleware) => {
                const middleware_is_function = typeof middleware === 'function';
                if (middleware_is_function)
                    return true;
                if (!middleware.methods)
                    return true;
                const methods_is_string = typeof middleware.methods === 'string';
                const methods_is_array = middleware.methods instanceof Array;
                if (!methods_is_string && !methods_is_array)
                    throw "methods: An Array or String data type is expected";
                if (middleware.middleware instanceof Array)
                    isFlatten = true;
                const methods = typeof middleware.methods === 'string'
                    ? [middleware.methods] : middleware.methods;
                return toUpper(methods).includes(method.toUpperCase());
            }).then((resp) => resp.map((middleware) => {
                var _a;
                return (_a = middleware.middleware) !== null && _a !== void 0 ? _a : middleware;
            }));
            return isFlatten ?
                yield flatten(resp_middlewares).then(val => val.valueOf()) :
                resp_middlewares.valueOf();
        }
        catch (e) {
            console.error(e);
        }
    });
}
/**
 *
 * @param arr -
 * @returns any[]
 */
function toUpper(arr) {
    return arr.filter((val) => val).map((val) => val.toUpperCase());
}

/**
 * middleware_next execution of each declared FuncMiddleware
 *
 * @param req - Http Request
 * @param res - Http Response
 * @param funcMiddleware - FuncMiddleware The middleware function runs in the middleware_next function
 * @param train -
 */
function middlewareNext(funcMiddleware, req, res, train) {
    return new Promise((next) => {
        funcMiddleware({ req, res, next, train });
    });
}
/**
 * exec_list_func controls the execution of each declared FuncMiddleware
 *
 * @param middlewares -
 * @param req - Http Request
 * @param res - Http Response
 */
function execListFunc(middlewares, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let train = {};
        for (const middleware of middlewares) {
            const result = yield middlewareNext(middleware, req, res, train);
            train = Object.assign(train, result !== null && result !== void 0 ? result : {});
            if (!result)
                break;
        }
        return train;
    });
}
/**
 * Main function: extract the middleware declared in the Sandwich.handler (Class, middleware) function
 *
 * @example
 * ```ts
 * Sandwich.handler (Users, [{
 * methods: ['POST'],
 * middleware: [isAuth]
 *}])
 *```
 *
 * @remarks
 * The get_middlewares function takes care of the extraction
 *
 * @param req - Http Request
 * @param res - Http Response
 * @param middlewares - array functions or function
 * @param method - `{string}` method request
 */
function middleware(req, res, middlewares, method) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!middlewares)
            return true;
        const functions = yield getMiddlewares(middlewares, method !== null && method !== void 0 ? method : '');
        return yield execListFunc(functions instanceof Array ? functions : [functions], req, res)
            .then((resp) => resp);
    });
}

/**
 * get data error
 *
 * @param data -
 * ```json
 * {
 *     message: message of error "bad request",
 *     errors: data errors
 * }
 * ```
 */
function get_data_errors(data) {
    return data;
}
/**
 * Server error Generate
 *
 * @param data -
 */
const error = (data) => {
    throw data;
};
/**
 * Class to handle exceptions
 */
class ClassException {
    constructor() {
        /**
         * Server error Generate
         *
         */
        this.error = error;
        /**
         * Server error Generate
         *
         * @param data -
         */
        this.server_error = (data) => {
            const { message, errors } = get_data_errors(data);
            error({ "statusCode": 500, "message": message, errors });
        };
        /**
         * Bad request Generate
         *
         * @param data -
         */
        this.bad_request = (data) => {
            const { message, errors } = get_data_errors(data);
            error({ "statusCode": 400, "message": message, errors });
        };
    }
}
const Exception = new ClassException();

/**
 *
 * Response messages due to validation failure
 */
const messageArgument = {
    validation: () => ({
        message: `validation_custom`
    }),
    required: () => ({
        message: "required_field"
    }),
    min: (props) => ({
        message: "minimum_characters",
        value: props.validValue
    }),
    max: (props) => ({
        message: "maximum_characters",
        value: props.validValue
    }),
    strict: (props) => ({
        message: "{key}_expected_data_type_{type}"
            .replace('{key}', props.key)
            .replace('{type}', props.type)
            .toLowerCase()
    })
};
/**
 *  list of validation functions
 *
 * @param funcArguments -
 */
const funcArguments = {
    /**
     *  * custom validation, for the data type specified in the argument
     *
     * @example
     * ```json
     * {
     *    email: {
     *    type: Sandwich.String, validation: (value: string) => typeof value == 'string'
     *  }
     * }
     * ```
     * @param validValue -
     * @param value -
     */
    validation: ({ validValue, value }) => validValue(value),
    /**
     * Validate value max
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    max: ({ type, validValue, value }) => {
        var _a, _b, _c, _d;
        if (typeof value === 'number') {
            return (value !== null && value !== void 0 ? value : 0) <= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
        else {
            const len = (_b = ((_a = type === null || type === void 0 ? void 0 : type.length) !== null && _a !== void 0 ? _a : 0)) !== null && _b !== void 0 ? _b : ((_d = (_c = type === null || type === void 0 ? void 0 : type.toString()) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0);
            return len <= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
    },
    /**
     * Validate value min
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    min: ({ type, validValue, value }) => {
        var _a, _b, _c, _d;
        if (typeof value === 'number') {
            return (validValue !== null && validValue !== void 0 ? validValue : 0) >= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
        else {
            const len = (_b = ((_a = type === null || type === void 0 ? void 0 : type.length) !== null && _a !== void 0 ? _a : 0)) !== null && _b !== void 0 ? _b : ((_d = (_c = type === null || type === void 0 ? void 0 : type.toString()) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0);
            return len >= (validValue !== null && validValue !== void 0 ? validValue : 0);
        }
    },
    /**
     * validate value required
     *
     * @param validValue -
     * @param value -
     */
    required: ({ validValue, value }) => validValue ? (!!value || value === 0) : true,
    /**
     * Validate value type
     *
     * @param value -
     * @param func -
     * @param scheme -
     */
    type: (value, func, scheme) => {
        const list_type = ['String', 'Number', 'Object'];
        switch (func.name) {
            case 'Array': return func.from(value);
            default:
                if (list_type.includes(func.name)) {
                    return new func(value);
                }
                return func(value, scheme);
        }
    },
    /**
     * Strictly validates the value of a data type
     *
     * @param strict - true to validate or false not to validate strict mode
     * @param type - Array
     * @param key - data (occupation)
     * @param value - `Developer`
     */
    validStrict: (strict, type, key, value) => {
        const valid = validate[type];
        if (strict && valid instanceof Function) {
            !valid(value) ? Exception.bad_request({
                message: "args_validation_errors",
                errors: [{
                        [key]: [messageArgument.strict({ key, type })]
                    }]
            }) : true;
        }
    }
};
/**
 * Validate a data type
 *
 * @param value - value to validate "Developer"
 * @param key - value key (occupation)
 * @param scheme - scheme validation
 * ```json
 * {type: String}
 * ```
 */
function validType({ value, key, scheme }) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = scheme['type'];
        const strict = scheme['strict'];
        const required = scheme['required'];
        if (type) {
            const name = type['type'];
            required && value ? funcArguments.validStrict(strict, name, key, value) : null;
            if (value === null || value === undefined)
                return value;
            return funcArguments.type(value, type, scheme);
        }
        else {
            Exception.server_error({ message: `${key} => ${value} no data type` });
        }
    });
}
/**
 *
 * @param messages -
 * @param keyValid -
 */
function getMessage(messages, keyValid) {
    if (messages)
        return messages[keyValid];
}
/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 * @param validValue - value of validation
 * @param keyValid - key main
 */
function validData(props, type, validValue, keyValid) {
    return new Promise((resolve) => {
        const { value, scheme, message: messages, key: key_main } = props;
        const funcValid = funcArguments[keyValid];
        const message = typeof messages == 'string' ? messages : (messages !== null && messages !== void 0 ? messages : getMessage(messages, keyValid));
        const messDefault = messageArgument[keyValid];
        if (!funcValid({ validValue, value, type, scheme })) {
            resolve(message !== null && message !== void 0 ? message : messDefault({ validValue, value, type, keyValid, key_main }));
        }
        resolve(false);
    });
}
/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 */
function validExtractArgument(props, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const validResponse = [];
        const { scheme } = props;
        /**
         *
         */
        if (scheme['required']) {
            const resp = yield validData(props, type, scheme['required'], 'required');
            if (resp)
                validResponse.push(resp);
        }
        /**
         *
         */
        if (scheme['min']) {
            const resp = yield validData(props, type, scheme['min'], 'min');
            if (resp)
                validResponse.push(resp);
        }
        /**
         *
         */
        if (scheme['max']) {
            const resp = yield validData(props, type, scheme['max'], 'max');
            if (resp)
                validResponse.push(resp);
        }
        /**
         *
         */
        if (scheme['validation']) {
            const resp = yield validData(props, type, scheme['validation'], 'validation');
            if (resp)
                validResponse.push(resp);
        }
        return validResponse;
    });
}
/**
 * validate Message
 *
 * @param errors -
 */
function validRespArgument(errors) {
    return __awaiter(this, void 0, void 0, function* () {
        return !errors.length;
    });
}
/**
 * Validate an argument schema
 *
 * @param props - data
 *
 * @example
 * ```json
 * {
 *     value: "example@sandwich.com"
 *     key: "email"
 *     scheme: {type: Sandwich.String, strict: true}
 * }
 * ```
 */
function validArgument(props) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = yield validType(props);
        const errors = yield validExtractArgument(props, type);
        const success = yield validRespArgument(errors);
        return { errors: errors, success, value: type };
    });
}
/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param reqBody - data body
 * @param scheme -
 * @param key - field key to validate
 */
function getValue(reqBody, scheme, key) {
    var _a;
    const defined_value = (_a = scheme['value']) !== null && _a !== void 0 ? _a : reqBody[key];
    return defined_value instanceof Function ? defined_value() : defined_value;
}
/**
 * This function validates all body data specified in the arguments
 *
 * @param valueOf - true stops returning the data to its primitive value of its instance
 * @param reqBody - request body
 * ```json
 * {email: "example@sandwich.com"}
 * ```
 * @param schemes - schemes of validation `{ email: {type: Sandwich.String, strict: true} }`
 */
function argument(valueOf, reqBody, schemes) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const resp = {};
        const body = {};
        const errors = [];
        if (!schemes)
            Exception.server_error({ message: `schemes is ${schemes}` });
        for (const key in schemes) {
            const scheme = (_a = schemes[key]) !== null && _a !== void 0 ? _a : null;
            if (scheme) {
                const validated = yield validArgument({
                    value: getValue(reqBody, scheme, key),
                    key: key,
                    message: scheme['message'],
                    scheme: scheme
                });
                Object.defineProperty(resp, key, {
                    enumerable: true,
                    value: validated
                });
                Object.defineProperty(body, key, {
                    enumerable: true,
                    value: valueOf || !validated.value ? validated.value : validated.value.valueOf()
                });
                if (validated.errors.length) {
                    errors.push({ [key]: validated.errors });
                }
            }
        }
        return {
            argument: resp,
            body,
            errors
        };
    });
}

/**
 * validate errors and send message
 *
 * @param errors -
 */
function verifyErrors(errors) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            errors: [],
            message: 'args_validation_successful'
        };
        if (errors.length) {
            response.errors = errors;
            response.message = 'args_validation_errors';
            isBrowser() ? Exception.error(response) : Exception.bad_request(response);
        }
        else {
            return response;
        }
    });
}

exports.argument = argument;
exports.middleware = middleware;
exports.middlewareNext = middlewareNext;
exports.verifyErrors = verifyErrors;
//# sourceMappingURL=validator.js.map
