import * as SW from '../../functions';

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
