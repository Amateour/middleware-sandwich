import * as SW from '../../functions';
import {middleware} from '../validator';
import {Message, Exception} from '../utils/message';
import {contextHttp} from '../utils/contextHttp';
import tomato from '../utils/tomato';

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

            const angain = (
                tomato($classRequest)
                .get(reqMethod.toLowerCase(), true)
            );

            if (!angain) return Exception.bad_request({
                message: `HTTP ${reqMethod} request is not allowed`
            });

            $classRequest.train = await middleware(
                req, res, middlewares, reqMethod
            )

            await angain(req, res, next);

        } catch (error: any) {
            Message.response(res, error.statusCode ?? 500, error)
        }
    }
}

export default Handler;
