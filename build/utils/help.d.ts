import * as SWCH from '../../functions';
/**
 * validate if it is an array
 *
 * @param elm
 * @returns boolean
 */
export declare const isArray: SWCH.isArray;
/**
 * validate if it is an objet
 *
 * @param elm
 * @returns boolean
 */
export declare const isObject: SWCH.isObject;
/**
 * validate if it is an string
 *
 * @param elm
 * @returns boolean
 */
export declare const isString: SWCH.isString;
/**
 * validate if it is an number
 *
 * @param elm
 * @returns boolean
 */
export declare const isNumber: SWCH.isNumber;
/**
 * Functions validations (isArray, isString)
 *
 * @constant validate
 */
export declare const validate: SWCH.validate;
/**
 * get_middlewares Middleware extraction, can be an array of function objects or an object
 *
 * example:
 * Array functions
 * Sanwiche.handler(Users, [isAuth])
 *
 * Array objects
 * Sanwiche.handler(Users, [
 * {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * }
 *])
 *
 * objects
 * Sanwiche.handler(Users, {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * })
 *
 * The extraction of each middleware is selected according to the method of the http request
 *
 * @param middlewares list middlewares
 * @param {string} method method request (post, get)
 */
export declare const get_middlewares: SWCH.get_middlewares;
/**
 *
 * @param arr
 * @returns string[]
 */
export declare const toUpper: SWCH.toUpper;
/**
 * Execute the function according to its specified method
 *
 * @param {object} push
 * @param {object} req
 * @param {object} res
 */
export declare const push_against: SWCH.push_against;
