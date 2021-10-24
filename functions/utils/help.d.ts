import {middlewaresType} from "../type";

/**
 * validation array
 * @returns boolean
 */
export type isArray = (elm: any) => boolean;
/**
 * validation array
 * @returns boolean
 */
export type isObject = (elm: any) => boolean;
/**
 * validation string
 * @returns boolean
 */
export type isString = (elm: any) => boolean;
/**
 * validation number
 * @returns boolean
 */
export type isNumber = (elm: any) => boolean;  

/**
 * 
 */
export type validate = {
  Array: isArray,
  String: isString,
  Number: isNumber,
  Object: isObject
}
/**
 *
 * @param middlewares
 * @param method
 */
export type get_middlewares = (middlewares: middlewaresType, method: string) => Promise<any>;
/**
 * 
 * @param {object} arr 
 * @returns 
 */
 export type toUpper = (arr: any[]) => any[]
/**
 * 
 * @param push
 * @param req
 * @param res
 */
export type push_against = (push: any, req: any, res: any) => Promise<any>