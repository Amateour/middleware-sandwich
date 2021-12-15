import * as SW from '../../functions';
/**
 * Identify if it is running in a browser
 */
export declare const isBrowser: () => boolean;
/**
 * Identify if it is running in a nodejs
 */
export declare const isNode: () => boolean;
/**
 * validate if it is an array
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isArray(elm: any): boolean;
/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isObject(elm: any): boolean;
/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isString(elm: any): boolean;
/**
 * validate if it is an number
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare function isNumber(elm: any): boolean;
/**
 * Functions validations (isArray, isString)
 *
 */
export declare const validate: SW.validate;
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
export declare function getMiddlewares(middlewares: SW.middlewares, method: string): Promise<any>;
/**
 *
 * @param arr -
 * @returns any[]
 */
export declare function toUpper(arr: string[]): string[];
