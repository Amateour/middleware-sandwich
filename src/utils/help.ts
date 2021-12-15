import * as SW from '../../functions';
import {filter, flatten} from './admixtures'

/**
 * Identify if it is running in a browser
 */
export const isBrowser: () => boolean = () => typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]';

/**
 * Identify if it is running in a nodejs
 */
export const isNode: () => boolean = () => typeof global !== "undefined"
    && ({}).toString.call(global) === '[object global]';

/**
 * validate if it is an array
 * 
 * @param elm - element validation
 * @returns boolean
 */
export function isArray(elm: any): boolean {
    return Array.isArray(elm);
}
/**
 * validate if it is an objet
 * 
 * @param elm - element validation
 * @returns boolean
 */
export function isObject(elm: any): boolean {
    return elm instanceof Object;
}
/**
 * validate if it is an string
 * 
 * @param elm - element validation
 * @returns boolean
 */
export function isString(elm: any): boolean {
    return typeof elm === "string";
}
/**
 * validate if it is an number
 * 
 * @param elm - element validation
 * @returns boolean
 */
export function isNumber(elm: any): boolean {
    return typeof elm === "number";
}

/**
 * Functions validations (isArray, isString)
 * 
 */
export const validate: SW.validate = {
    Array: isArray,
    String: isString,
    Number: isNumber,
    Object: isObject,
    Browser: isBrowser,
    Node: isNode
}

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
export async function getMiddlewares(middlewares: SW.middlewares, method: string) {
    try {
        let isFlatten = false;
         if (!(typeof middlewares === 'object')) return middlewares;
         const resp_middlewares: any = await filter(middlewares,(middleware: SW.multiMiddlewareType) => {
            const middleware_is_function = typeof middleware === 'function';
            if(middleware_is_function) return true;

            if(!middleware.methods) return true;

            const methods_is_string = typeof middleware.methods  === 'string';
            const methods_is_array = middleware.methods instanceof Array;
            if(!methods_is_string && !methods_is_array)
                throw "methods: An Array or String data type is expected";

            if(middleware.middleware instanceof Array)
                isFlatten = true;

            const methods =  typeof middleware.methods  === 'string'
            ? [middleware.methods]: middleware.methods;
            return toUpper(methods).includes(method.toUpperCase());
        }).then((resp: any) =>  resp.map((middleware: SW.multiMiddlewareType) => {
             return middleware.middleware ?? middleware
         }));
        return isFlatten ?
            await flatten(resp_middlewares).then(val => val.valueOf()) :
            resp_middlewares.valueOf();
    }catch (e) {
        console.error(e);
    }
}

/**
 * 
 * @param arr -
 * @returns any[]
 */
export function toUpper(arr: string[]): string[] {
    return arr.filter((val) => val).map((val: string) => val.toUpperCase());
}

