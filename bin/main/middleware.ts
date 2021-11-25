import * as SW from '../../functions';
import {push_against, toUpper} from '../utils/help';
import {middleware, method} from '../validator';
import {Message} from '../utils/message';
import {contextHttp} from '../utils/contextHttp';
import Routers from './routers';
import Validators from "./validators";
import _ from 'lodash';

/**
 * Execute validation functions (method, middleware)
 *
 * @param options - Configuration object for validation process
 * @returns Promise<object>
 */
async function exec(options: SW.routerProps): Promise<SW.HandleExecResponse> {
    let req_method = undefined;

    if (typeof options.req.method == 'string') {
        req_method = options.req.method;
    }

    return await method(options.method, req_method).then(async (result_method) => {
        const method = result_method;
        const req_body = options.req.body;

        const
            /**
             *
             * @param middleware_resp - middleware
             */
            middleware_resp = await middleware(
                options.req, options.res, options.middleware, method
            );

        return {
            train: middleware_resp,
            success: true,
            method: method,
            req_body: req_body,
        }
    });
}

/**
 * @privateRemarks
 * Run all validation functions, and catch all errors
 *
 * @param options - Configuration object for validation process.
 * @returns Promise<any>
 */
function transform(options: SW.routerProps): Promise<any>{
    return new Promise((resolve, reject) => {
        exec(options)
            .then((resp) => resolve(resp) )
            .catch(err => reject(err));
    })
}

/**
 * Prepare the class to be used by routing
 *
 * @example
 * Controller function usage example
 *
 * ```ts
 * Sandwich.handler(Users, [isAuthenticated()])
 * ```
 *
 * @param classRequest - Class that will serve as a pillow for routing.
 * @param middlewares - Middleware functions that run before the final function or final middleware
 * @returns
 */
function Handler(classRequest: SW.HandlerResource, middlewares?: SW.middlewares): SW.HandlerResponse {
    return async (req: SW.Any, res: SW.Any, next?: SW.Next) => {
        contextHttp.response = res;
        contextHttp.request = req;
        const $classRequest = new classRequest();

        /**
         * selected methods
         *
         */
        const methods_list: any[] = _.map([
            'post',
            'get',
            'put',
            'delete',
            'patch'
        ], (val) => _.get($classRequest, val) ? val: undefined);
        /**
         * selected methods
         *
         */
        const methods = toUpper(methods_list);

        const data_transform = {
            middleware: middlewares,
            method: methods,
            req: req,
            res: res
        }

        const errors: SW.Any = await transform(data_transform).then((resp) => {
            $classRequest.train = resp.train;
            $classRequest.request = {
                success: resp.success,
                method: resp.method
            };

            push_against($classRequest, req, res, next)
                .catch((err)=> err);

        }).catch((err) => err);

        if(errors) Message.response(res, errors.statusCode, errors);
    }
}

/**
 * Returns a class called Resource, which loads the resources. Also, after loading the necessary
 * resources for the routing job, it loads the initial configuration for the validation of the
 * arguments and parameters.
 *
 *
 * @remarks
 * The configuration of the arguments and parameters will be executed through the
 * parser_schemes function, which is a property of the Resource class.
 *
 * @example
 * examples of schemes:
 * ```json
 * {
 *   email: {type: Sandwich.String, required: true, strict: true,
 *   password: {type: Sandwich.String, required: true, strict: true, min: 8,
 * }
 * ```
 */
export class Resource implements SW.Resource {
    /**
     * Loads the data returned by the middleware, in case the promise is fulfilled.
     *
     */
    train: SW.Any;
    /**
     * http request functions
     *
     */
    request: SW.Any;

}

/**
 *
 */
class Sandwich extends Validators implements SW.SandwichClass {
    /**
     *
     */
    handler = Handler;
    /**
     *
     * @param app -
     */
    routers = (app: SW.Routers.router) => new Routers(app);
}

export default new Sandwich();
