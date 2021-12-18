import * as SW from '../../functions';
import {Message, Exception} from '../utils/message';
import {contextHttp} from '../utils/contextHttp';
import {get} from '../utils/admixtures';
import {getMiddlewares} from "../utils/help";
import {
    FuncMiddleware,
    middlewareReturn,
    middlewares,
    middlewareNextReturn,
    ReqType,
    ResType,
    execListFuncReturn
} from "../../functions";

/**
 * middleware_next execution of each declared FuncMiddleware
 *
 * @param req - Http Request
 * @param res - Http Response
 * @param funcMiddleware - FuncMiddleware The middleware function runs in the middleware_next function
 * @param train -
 */
export function middlewareNext(
    funcMiddleware: FuncMiddleware, req: ReqType, res: ResType, train: any
): Promise<middlewareNextReturn> {
    return new Promise((next) => {
        funcMiddleware({req, res, next, train});
    });
}

/**
 * execListFunc controls the execution of each declared FuncMiddleware
 *
 * @param middlewares -
 * @param req - Http Request
 * @param res - Http Response
 */
async function execListFunc(
    middlewares: FuncMiddleware[], req: ReqType, res: ResType
): Promise<execListFuncReturn> {
    let train = {};
    for (const middleware of middlewares) {
        const result = await middlewareNext(middleware, req, res, train);
        train = Object.assign(train, result ?? {});
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
    req: ReqType, res: ResType, middlewares: middlewares | undefined, method: string
): Promise<middlewareReturn> {
    if (!middlewares) return true;
    const functions = await getMiddlewares(middlewares, method ?? '');
    return await execListFunc(
        functions instanceof  Array ? functions : [functions]
        , req, res)
        .then((resp: any) => resp);
}

/**
 * Prepare the class to be used by routing
 *
 * @example
 * Controller function usage example
 *
 * ```ts
 * Sandwich.handler(Users, [isAuthenticated])
 * ```
 *
 * @param classRequest - Class that will serve as a pillow for routing.
 * @param middlewares - Middleware functions that run before the final function or final middleware
 * @returns
 */
function Handler(classRequest: SW.HandlerResource, middlewares?: SW.middlewares): SW.HandlerResponse {
    return async (req: SW.Any, res: SW.Any, next?: SW.Next) => {
        try {
            const reqMethod: string = req.method;

            contextHttp.response = res;
            contextHttp.request = req;

            const $classRequest = new classRequest();

            const again = (
                get($classRequest, reqMethod.toLowerCase(), true)
            );

            if (!again) return Exception.bad_request({
                message: `HTTP ${reqMethod} request is not allowed`
            });

            $classRequest.train = await middleware(
                req, res, middlewares, reqMethod
            )

            await again(req, res, next);

        } catch (error: any) {
            Message.response(res, error.statusCode ?? 500, error)
        }
    }
}

export default Handler;
