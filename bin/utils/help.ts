import * as SWCH from '../functions'; 
export const isArray: SWCH.isArray = (elm) => elm instanceof Array;
export const isObject: SWCH.isObject = (elm) => elm instanceof Object;
export const isString: SWCH.isString = (elm) => typeof elm === "string";
export const isNumber: SWCH.isNumber = (elm) => typeof elm === "number";

/**
 * 
 * @constant validate
 */
export const validate: SWCH.validate = {
    Array: isArray,
    String: isString,
    Number: isNumber,
    Object: isObject
}

const _ = require('lodash');

/**
 *
 * @param middlewares
 * @param method
 */
export const get_middlewares: SWCH.get_middlewares = async (middlewares, method) => {
    try {
        let flatten = false;
         if (!(typeof middlewares === 'object')) return middlewares;
         const resp_middlewares = await _(middlewares).filter((middleware)=> {
            const middleware_is_function = typeof middleware === 'function';
            if(middleware_is_function) return true;

            if(!middleware.methods) return true;

            const methods_is_string = typeof middleware.methods  === 'string';
            const methods_is_array = middleware.methods instanceof Array;
            if(!methods_is_string && !methods_is_array)
                throw "methods: An Array or String data type is expected";

            if(middleware.middleware instanceof Array)
                flatten = true;

            const methods =  typeof middleware.methods  === 'string'
            ? [middleware.methods]: middleware.methods;
            return toUpper(methods).includes(method.toUpperCase());
        }).map((middleware) => middleware.middleware ?? middleware);
        return flatten ? await resp_middlewares.flatten(resp_middlewares).valueOf() : resp_middlewares.valueOf();
    }catch (e) {
        console.error(e);
    }
}

/**
 * 
 * @param {object} arr 
 * @returns 
 */
export const toUpper: SWCH.toUpper = (arr) => {
    return _(arr).filter((val) => val).map(_.toUpper).valueOf();
}

/**
 * 
 * @param {object} push 
 * @param {object} req 
 * @param {object} res 
 */
export const push_against: SWCH.push_against = async (push, req, res) => {
    const method = push.request.method;
    switch (method) {
        case 'POST': await push.post(req, res)
            break;
        case 'GET': await push.get(req, res)
            break;
        case 'PUT': await push.put(req, res)
            break;
        case 'DELETE': await push.delete(req, res)
            break;
    }
}
