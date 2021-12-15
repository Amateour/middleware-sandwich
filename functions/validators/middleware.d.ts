import {ReqType, resolvePromiseScheme, ResType} from "../utils/typeUtil";

type PropsMiddleware = {
    req?: ReqType,
    res?: ResType,
    next: resolvePromiseScheme,
    train: any
}

/**
 * The middleware function runs in the middleware_next function
 * @returns void
 */
export declare type FuncMiddleware = (
    props: PropsMiddleware
) => void;

type middlewareNextReturn = any

type execListFuncReturn = any;

type middlewareReturn = any
