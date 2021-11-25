import {ReqType, resolvePromiseScheme, ResType} from "../utils/typeUtil";

/**
 * The middleware function runs in the middleware_next function
 * @returns void
 */
export declare type FuncMiddleware = (
    req: ReqType, res: ResType, resolve: resolvePromiseScheme, train: any
) => void;

type middlewareNextReturn = any

type execListFuncReturn = any;

type middlewareReturn = any
