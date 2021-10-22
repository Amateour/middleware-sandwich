import * as SWCH from '../functions';
import {get_middlewares} from "../utils/help";

/**
 * @param req
 * @param res
 * @param func
 * @param train
 */
export const middleware_next: SWCH.middleware_next = (func, req, res, train) => {
   return new Promise((resolve) => {
       func(req, res, resolve, train);
    });
}

/**
 *
 * @param middlewares
 * @param req
 * @param res
 */
const exec_list_func: SWCH.exec_list_func = async (middlewares, req, res) => {
    let train = {};
    for (const middleware of middlewares) {
        const result = await middleware_next(middleware, req, res, train);
        if (!result) break;
        train =  result ? {...train, ...result} : train;
    }
    return train;
}

/**
 * middleware
 *
 * @param res
 * @param req
 * @param middlewares array functions or function
 * @param method {string} method request
 */
export const middleware: SWCH.middleware = async (
    req, res, middlewares, method
) => {
    if (!middlewares) return true;
    const functions = await get_middlewares(middlewares, method ?? '');
    return await exec_list_func(
        functions instanceof  Array ? functions : [functions]
        , req, res)
        .then((resp) => resp);
}
