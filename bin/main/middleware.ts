import * as SW from '../../functions';
import {argument, method, middleware, verifyErrors} from '../validators/validator';
import {push_against, toUpper} from '../utils/help';
import {Message} from '../utils/message';
import Routers from './routers';
import Validators from "./validators";
import _ from 'lodash';

/**
 * Execute validation functions (method, middleware)
 *
 * @param options - Configuration object for validation process
 * @return Promise<object>
 */
const exec: SW.HandlerExec = async (options) => {
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
            f: middleware_resp,
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
const transform: SW.HandlerTransform = (options) => {
    return new Promise((resolve, reject) => {
        exec(options)
            .then((resp) => resolve(resp) )
            .catch(err => reject(err));
    })
}

/**
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * @param values - data body request.
 * @param respActive - if it is true, the errors checked by `res.status(200).json ({message: 'message'})` will be returned, if it is false it generates an exception that is replicated in the handler function `Sandwich.handler`
 * @returns
 */
export const parserSchemes: SW.HandlerParserSchemes = async (
    valueOf, schemes, values, respActive = false
) => {
    const
        /**
         *
         * @param result_argument result argument
         */
        result_argument = await argument(valueOf ?? true, values ?? {}, schemes),
        /**
         * check for errors in arguments
         *
         * @param responseError - bug check response
         */
        responseError = await verifyErrors(result_argument.argument, respActive);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: responseError.errors,
        message: responseError.message
    }
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
 * @return
 */
const Handler = (classRequest: SW.HandlerResource, middlewares?: SW.middlewares) => {
    return async (req: SW.Any, res: SW.Any, next?: SW.Next) => {

        const $classRequest = new classRequest(req, res);
        if($classRequest.addArgs instanceof Function) {
            $classRequest.addArgs()
        }
        /**
         * selected methods
         *
         */
        const methods_list: SW.AnyArray = _.map([
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
            $classRequest.train = resp.f;
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
 * @examples
 * examples of schemes:
 * ```json
 * {
 *   email: {type: Sandwich.String, required: true, strict: true,
 *   password: {type: Sandwich.String, required: true, strict: true, min: 8,
 * }
 * ```
 */
export class Resource extends Validators implements SW.Resource {
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
    /**
     * The addArgs property must be represented in the child class as a function
     * within this function the schemas are loaded for the validation of the arguments
     *
     * @example
     *
     * async addArgs(){
     *     await this.parser({type: Sandwich.String, required: true, strict: true}, ['email'])
     * }
     *
     */
    addArgs: any = undefined;
    /**
     * Creates an instance of Resource.
     *
     * @param req - http request functions
     */
    constructor(req: any) {
        super(true, {}, true)
        this.values = {...req.body, ...req.query, ...req.params}
    }
    /**
     *
     * @param schemes -
     * @param arg -
     */
    parser(schemes: SW.schemes, arg: string | string[]) {
        return new Promise(resolve => {
            if(typeof arg == 'string') {
                this.schemes = {
                    [arg]: schemes,
                    ...this.schemes
                };
                resolve(true);
            } else {
                for (let i = 1; i <= arg.length; i++) {
                    this.schemes = {
                        [arg[i - 1]]: schemes,
                        ...this.schemes
                    }
                    if(i == arg.length) resolve(true);
                }
            }
        });
    }
    /**
     * Returns an anonymous extended class of Resource, which loads the resources. Also, after loading the necessary
     * resources for routing work, load initial configuration for validation of the
     * arguments and parameters.
     *
     *
     * @remarks
     * The configuration of the arguments and parameters will be executed through the
     * parser_schemes function, which is a property of the Resource class.
     *
     * @param schemes - The validation schemes are passed to the this.schemes property of the Resource class
     *
     * @examples
     * examples of schemes:
     * ```json
     * {
     *   email: {type: Sandwich.String, required: true, strict: true,
     *   password: {type: Sandwich.String, required: true, strict: true, min: 8,
     * }
     * ```
     *
     * @returns Class Args extends Resource
     */
    static args(schemes: SW.schemes): SW.HandlerResource {
        return class extends Resource {
            constructor(req: any) {
                super(req);
                this.schemes = schemes;
                this.addArgs = undefined;
            }
        }
    }
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
     * @param app
     */
    routers = (app: SW.Routers.router) => new Routers(app);
    /**
     *
     */
    args = Resource.args;
}

export default new Sandwich();
