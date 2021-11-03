import * as SWCH from '../../functions';
import {get_middlewares} from "../utils/help";

/**
 * middleware_next execution of each declared FuncMiddleware
 * 
 * @param req - Http Request
 * @param res - Http Response
 * @param funcMiddleware - FuncMiddleware The middleware function runs in the middleware_next function
 * @param train -
 */
export const middleware_next: SWCH.middleware_next = (
    funcMiddleware, req, res, train
) => {
   return new Promise((resolve) => {
        funcMiddleware(req, res, resolve, train);
    });
}

/**
 * exec_list_func controls the execution of each declared FuncMiddleware
 * 
 * @param middlewares
 * @param req - Http Request
 * @param res - Http Response
 */
const exec_list_func: SWCH.exec_list_func = async (middlewares, req, res) => {
    let train = {};
    for (const middleware of middlewares) {
        const result = await middleware_next(middleware, req, res, train);
        train =  result ? {...train, ...result} : train;
        if (!result) break;
    }
    return train;
}

/**
 * Main function: extract the middleware declared in the Sandwich.handler (Class, middleware) function
 *
 * @example
 * ```ts
 * Sanwiche.handler (Users, [{
 * methods: ['POST'],
 * middleware: [isAuth]
 *}])
 *```
 *
 * @remarks
 * The get_middlewares function takes care of the extraction
 *
 * @param req - Http Request
 * @param res - Http Response
 * @param middlewares - array functions or function
 * @param method - `{string}` method request
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
