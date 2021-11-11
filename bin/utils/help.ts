import * as SWCH from '../../functions'; 
import _ from 'lodash';

/**
 * validate if it is an array
 * 
 * @param elm - element validation
 * @returns boolean
 */
export const isArray: SWCH.isArray = (elm) => elm instanceof Array && typeof elm === 'object';
/**
 * validate if it is an objet
 * 
 * @param elm - element validation
 * @returns boolean
 */
export const isObject: SWCH.isObject = (elm) => elm instanceof Object;
/**
 * validate if it is an string
 * 
 * @param elm - element validation
 * @returns boolean
 */
export const isString: SWCH.isString = (elm) => typeof elm === "string";
/**
 * validate if it is an number
 * 
 * @param elm - element validation
 * @returns boolean
 */
export const isNumber: SWCH.isNumber = (elm) => typeof elm === "number";

/**
 * Functions validations (isArray, isString)
 * 
 */
export const validate: SWCH.validate = {
    Array: isArray,
    String: isString,
    Number: isNumber,
    Object: isObject
}

/**
 * get_middlewares Middleware extraction, can be an array of function objects or an object
 * 
 * @example
 * Array functions
 * Sanwiche.handler(Users, [isAuth])
 * 
 * Array objects
 * ```ts
 * Sanwiche.handler(Users, [
 * {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * }
 *])
 *```
 *
 *```ts
 * objects
 * Sanwiche.handler(Users, {
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
export const get_middlewares: SWCH.get_middlewares = async (middlewares, method) => {
    try {
        let flatten = false;
         if (!(typeof middlewares === 'object')) return middlewares;
         const resp_middlewares: any = await _(middlewares)
         .filter((middleware: SWCH.multiMiddlewareType)=> {
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
        }).map((middleware: SWCH.multiMiddlewareType) => middleware.middleware ?? middleware);
        return flatten ? await _.flatten(resp_middlewares).valueOf() : resp_middlewares.valueOf();
    }catch (e) {
        console.error(e);
    }
}

/**
 * 
 * @param arr -
 * @returns string[]
 */
export const toUpper: SWCH.toUpper = (arr) => {
    return _(arr).filter((val) => val).map(_.toUpper).valueOf();
}

/**
 * Execute the function according to its specified method
 * 
 * @param push - 
 * @param req -
 * @param res -
 * @param next - Next function
 */
export const push_against: SWCH.push_against = async (push, req, res, next) => {
    const method = push.request.method;
    switch (method) {
        case 'POST': await push.post(req, res, next)
            break;
        case 'GET': await push.get(req, res, next)
            break;
        case 'PUT': await push.put(req, res, next)
            break;
        case 'DELETE': await push.delete(req, res, next)
            break;
    }
}
