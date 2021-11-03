import * as SWCH from '../../functions';
/**
 * validate if it is an array
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isArray: SWCH.isArray;
/**
 * validate if it is an objet
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isObject: SWCH.isObject;
/**
 * validate if it is an string
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isString: SWCH.isString;
/**
 * validate if it is an number
 *
 * @param elm - element validation
 * @returns boolean
 */
export declare const isNumber: SWCH.isNumber;
/**
 * Functions validations (isArray, isString)
 *
 */
export declare const validate: SWCH.validate;
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
export declare const get_middlewares: SWCH.get_middlewares;
/**
 *
 * @param arr -
 * @returns string[]
 */
export declare const toUpper: SWCH.toUpper;
/**
 * Execute the function according to its specified method
 *
 * @param push -
 * @param req -
 * @param res -
 * @param next - Next function
 */
export declare const push_against: SWCH.push_against;
