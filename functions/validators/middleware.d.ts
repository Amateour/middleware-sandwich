import {middlewaresType, reqType, resType} from "../type";

/**
 * 
 * @param req
 * @param res
 * @param func
 * @param train
 */
export type middleware_next = (func: Function, req: reqType, res: resType, train: any) => Promise<object>

/**
 *
 * @param middlewares
 * @param req
 * @param res
 */
export type exec_list_func = (middlewares: Array<Function>, req: reqType, res: resType) => Promise<any>

/**
 * middleware
 *
 * @param res
 * @param req
 * @param middlewares array functions or function
 * @param method {string} method request
 */
export type middleware = (
    req: reqType, res: resType, middlewares?: middlewaresType, method?: string
) => Promise<any>
