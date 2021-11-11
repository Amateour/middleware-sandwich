import * as SW from '../../functions';
import {argument, method, middleware, verifyErrors, Types} from '../validators/validator';
import {push_against, toUpper} from '../utils/help';
import {Message} from '../utils/message';
import Routers from './routers';
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
 * @param value_of - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * @param req_body - data body request.
 * @param respActive - if it is true, the errors checked by `res.status(200).json ({message: 'message'})` will be returned, if it is false it generates an exception that is replicated in the handler function `Sandwich.handler`
 * @returns
 */
const parserSchemes: SW.HandlerParserSchemes = async (
    value_of, schemes, req_body, respActive = false
) => {
    const
        /**
         *
         * @param result_argument result argument
         */
        result_argument = await argument(value_of ?? true, req_body ?? {}, schemes),
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
export class Resource implements SW.Resource {
    /**
     * Validation schemes
     *
     */
    schemes: SW.schemes;
    /**
     * Parse and validate data
     *
     */
    readonly parser_schemes: SW.HandlerParserSchemes;
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
     * argsActive validates if the Resource class is loaded from the args method
     *
     */
    private argsActive: any = false;
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
        /**
         * Parse and validate data
         *
         *
         * @param valueOf - [value_of=true] True to execute valueOf, false to keep the native format
         * @return SW.ParserSchemesResponse
         */
        this.parser_schemes = function(
            valueOf = true
        ): Promise<SW.ParserSchemesResponse> {
            return new Promise((resolve) => {
                this.addArgs instanceof Function && !this.argsActive ? resolve(this.addArgs()): resolve(true);
            }).then(() => parserSchemes(
                valueOf,
                this.schemes,
                {...req.body, ...req.query, ...req.params},
                true // exec Exception.bad_request if there are errors
            ));
        }
    }

    /**
     *
     * @param schemes -
     * @param arg -
     */
    parser(schemes: SW.schemes, arg: string | string[]) {
        return new Promise(resolve => {
            if(typeof arg == 'string') {
                console.log(this.schemes)
                this.schemes = {
                    [arg]: schemes,
                    ...this.schemes
                };
                console.log(this.schemes)
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
                this.argsActive = true;
            }
        }
    }
}

/**
 * @alpha
 */
export class Sandwiches extends Types implements SW.Sandwiches {
    /**
     * Object type property.
     *
     */
    schemes: SW.schemes;
    /**
     * Boolean type property.
     *
     */
    value_of: boolean;
    /**
     * Creates an instance of Sandwiches.
     *
     * @param value_of - Determines how validated arguments and parameters are extracted.
     * @defaultValue value_of=true
     * @param schemes - List of validation schemes.
     * @defaultValue schemes={}
     */
    constructor(value_of = true, schemes = {}) {
        super();
        this.schemes = schemes;
        this.value_of = value_of;
    }
    /**
     * parse and validate request body data
     *
     * @param body - Data subject to validation
     * @return
     */
    async parser_schemes(body: SW.Any)
    {
        return await parserSchemes(
            this.value_of, this.schemes, body
        )
    }
    /**
     *
     *
     * @param options -
     * @return
     * @deprecated
     */
    _(options: SW.routerProps) {
        return transform(options)
    }
}

/**
 *
 */
class Sandwich extends Sandwiches implements SW.SandwichClass {
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
    resource = Resource;
}

export default new Sandwich();
