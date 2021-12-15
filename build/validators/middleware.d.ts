import * as SW from '../../functions';
import { FuncMiddleware, middlewareNextReturn, ReqType, ResType } from "../../functions";
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
export declare function middleware(req: SW.ReqType, res: SW.ResType, middlewares: SW.middlewares | undefined, method: string): Promise<SW.middlewareReturn>;
