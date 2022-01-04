import * as SW from '../../functions';
import { FuncMiddleware, middlewareReturn, middlewares, middlewareNextReturn, ReqType, ResType } from "../../functions";
/**
 *
 * @param arr -
 * @returns any[]
 */
export declare function toUpper(arr: string[]): string[];
/**
 * get_middlewares Middleware extraction, can be an array of function objects or an object
 *
 * @example
 * Array functions
 * Sandwich.handler(Users, [isAuth])
 *
 * Array objects
 * ```ts
 * Sandwich.handler(Users, [
 * {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * }
 *])
 *```
 *
 *```ts
 * objects
 * Sandwich.handler(Users, {
 *   methods: ['POST'],
 *   middleware: [isAuth]
 * })
 * ```
 *
 * @remarks
 * The extraction of each middleware is selected according to the method of the http request
 *
 * @param middlewares - list middlewares
 * @param method - method request (post, get)
 */
export declare function getMiddlewares(middlewares: SW.middlewares, method: string): Promise<any>;
/**
 * middleware_next execution of each declared FuncMiddleware
 *
 * @param req - Http Request
 * @param res - Http Response
 * @param funcMiddleware - FuncMiddleware The middleware function runs in the middleware_next function
 * @param train -
 */
export declare function middlewareNext(funcMiddleware: FuncMiddleware, req: ReqType, res: ResType, train: any): Promise<middlewareNextReturn>;
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
export declare function middleware(req: ReqType, res: ResType, middlewares: middlewares | undefined, method: string): Promise<middlewareReturn>;
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
declare function Handler(classRequest: SW.HandlerResource, middlewares?: SW.middlewares): SW.HandlerResponse;
export default Handler;
