import {
    middlewares,
    schemes,
    scheme,
    ReqType,
    ResType,
    Next,
    TypeValid,
    resolvePromiseScheme
} from "../utils/typeUtil";

/**
 *
 */
export interface Resource {
    train: unknown;
    request: any;
}

/**
 * Constructor of the Resource class
 */
export interface HandlerResource {
    new (): Resource,
}

type HandlerResponse = (
    req: ReqType, res: ResType, next?: Next
) => unknown;
/**
 *
 *
 * @param classRequest -
 * @param middlewares -
 * @returns HandlerResponse
 */
type Handler = (classRequest: any, middlewares?: middlewares) => HandlerResponse;



/**
 *
 */
export interface SandwichClass extends ValidatorsClass {
    /**
     *
     */
    handler: Handler,
}

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