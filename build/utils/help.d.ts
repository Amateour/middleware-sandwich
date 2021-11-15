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
export declare const isArray: SW.isArray;
/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isObject: SW.isObject;
/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isString: SW.isString;
/**
 * validate if it is an number
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isNumber: SW.isNumber;
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
export declare const get_middlewares: SW.get_middlewares;
/**
 *
 * @param arr -
 * @returns string[]
 */
export declare const toUpper: SW.toUpper;
/**
 * Execute the function according to its specified method
 *
 * @param push -
 * @param req -
 * @param res -
 * @param next - Next function
 */
export declare const push_against: SW.push_against;
