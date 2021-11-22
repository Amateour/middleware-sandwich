import {middlewareType, ReqType, resolvePromiseScheme, ResType} from "../type";

/**
 * The middleware function runs in the middleware_next function
 * @returns void
 */
export declare type FuncMiddleware = (
    req: ReqType, res: ResType, resolve: resolvePromiseScheme, train: any
) => void;

/**
 * @param req -
 * @param res -
 * @param funcMiddleware -
 * @param train -
 */
export type middleware_next = (
    funcMiddleware: FuncMiddleware, req: ReqType, res: ResType, train: any
    ) => Promise<object>

/**
 *
 * @param middlewares -
 * @param req -
 * @param res -
 */
export type exec_list_func = (middlewares: FuncMiddleware[], req: ReqType, res: resType) => Promise<any>

/**
 * middleware
 *
 * @param res -
 * @param req -
 * @param middlewares - array functions or function
 * @param method - {string} method request
 */
export type middleware = (
    req: ReqType, res: ResType, middlewares?: middlewareType, method?: string
) => Promise<any>
