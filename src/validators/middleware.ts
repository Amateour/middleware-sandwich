import * as SW from '../../functions';
import {get_middlewares} from "../utils/help";
import {FuncMiddleware, middlewareNextReturn, ReqType, ResType} from "../../functions";

/**
 * middleware_next execution of each declared FuncMiddleware
 * 
 * @param req - Http Request
 * @param res - Http Response
 * @param funcMiddleware - FuncMiddleware The middleware function runs in the middleware_next function
 * @param train -
 */
export function middleware_next(
    funcMiddleware: FuncMiddleware, req: ReqType, res: ResType, train: any
): Promise<middlewareNextReturn> {
   return new Promise((resolve) => {
        funcMiddleware(req, res, resolve, train);
    });
}

/**
 * exec_list_func controls the execution of each declared FuncMiddleware
 * 
 * @param middlewares -
 * @param req - Http Request
 * @param res - Http Response
 */
async function exec_list_func(
    middlewares: SW.FuncMiddleware[], req: SW.ReqType, res: SW.ResType
): Promise<SW.execListFuncReturn> {
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
 * Sandwich.handler (Users, [{
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
export async function middleware (
    req: SW.ReqType, res: SW.ResType, middlewares: SW.middlewares | undefined, method: string
): Promise<SW.middlewareReturn> {
    if (!middlewares) return true;
    const functions = await get_middlewares(middlewares, method ?? '');
    return await exec_list_func(
        functions instanceof  Array ? functions : [functions]
        , req, res)
        .then((resp: any) => resp);
}
