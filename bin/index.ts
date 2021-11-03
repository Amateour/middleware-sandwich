import * as SWCH from '../functions';
import {push_against, toUpper} from './utils/help';
import {Message} from './utils/message';
import {argument, method, middleware, verifyErrors, Types} from './validators/validator';
import _ from 'lodash';

/**
 * Execute validation functions (method, middleware)
 *
 * @param options - Configuration object for validation process
 * @return Promise<object>
 */
export const exec: SWCH.exec = async (options) => {
    let req_method = undefined;
    
    if (typeof options.req.method == 'string') {
        req_method = options.req.method;
    }

    return await method(options.method, req_method).then(async (result_method) => {
        const method = result_method;
        const req_body = options.req.body;
        const schemes = options.argument ?? {};

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
            schemes: schemes,
            req_body: req_body,
            /**argument: result_argument.argument,
            body: result_argument.body,
            errors: errors**/
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
const transform: SWCH.transform = (options) => {
    return new Promise((resolve, reject) => {
        exec(options)
            .then((resp) => resolve(resp) )
            .catch(err => reject(err));
    })
}
/**
 * 
 * @param value_of - Determines how validated arguments and parameters are extracted.
 * @param scheme - scheme
 * @param req_body - data body request.
 * @param request - if it is true, the errors checked by `res.status(200).json ({message: 'message'})` will be returned, if it is false it generates an exception that is replicated in the handler function `Sandwich.handler`
 * @returns 
 */
const parserSchemes: SWCH.parserSchemes = async (
    value_of, scheme, req_body, request = false
) => {
    const
    /**
     *
     * @param result_argument result argument
     */
    result_argument = await argument(value_of, req_body, scheme),
    /**
     * check for errors in arguments
     *
     * @param responseError - bug check response 
     */
    responseError = await verifyErrors(result_argument.argument, request);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: responseError.errors,
        message: responseError.message
    }
}
/**
 * @alpha
 */
export class Sandwiches extends Types implements SWCH.Sandwiches {
    /**
     * Object type property.
     *
     */
    schemes: SWCH.schemes;
    /**
     * Booleana type property.
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
     * @param body - Datos sujetos a validación
     * @return
     */
    async parser_schemes(body: SWCH.Any)
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
     */
    _(options: SWCH.routerProps) {
        return transform(options)
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
     * @param classRequest - Classe that will serve as a pillow for routing.
     * @param middlewares - Middleware functions that run before the final function or final middleware
     * @return
     */
    handler(classRequest: SWCH.Any, middlewares?: SWCH.middlewaresType) {
        return async (req: SWCH.Any, res: SWCH.Any, next?: SWCH.Next) => {
            
            const $classRequest = new classRequest(req, res);
            const {arg} = $classRequest;
            /**
             * selecte methods
             *
             */
            const methods_list: SWCH.AnyArray = await _.map([
                'post',
                'get',
                'put',
                'delete',
                'pacth'
            ], (val) => _.get($classRequest, val) ? val: undefined);       
            /**
             * selected methods
             *
             */
            const methods = await toUpper(methods_list);

            const data_transform = {
                middleware: middlewares,
                argument: arg,
                method: methods,
                req: req,
                res: res
            }

            const errors: SWCH.Any = await transform(data_transform).then((resp) => {
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
     * Returns a class called Resource, which loads the resources. Also, after loading the necessary resources for the routing job, it loads the initial configuration for the validation of the arguments and parameters.
     * 
     * 
     * @remarks
     * La configuración de los argumentos y parámetros se ejecutará a través de la función parser_schemes, que es una propiedad de la clase Resource.
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
     * @returns Class Resource
     */
    resource = (schemes: SWCH.schemes) => {
        return class Resource implements SWCH.Resource {
            /**
             * Validation schemes
             *
             */
            readonly schemes: SWCH.schemes;
            /**
             * Parse and validate data
             *
             */
            readonly parser_schemes: SWCH.parserSchemes;
            /**
             * Loads the data returned by the middleware, in case the promise is fulfilled.
             *
             */
            train: SWCH.Any;
            /**
             * http request functions
             *
             */
            request: SWCH.Any;
            /**
             * Creates an instance of Resource.
             * 
             * @param req - http request functions
             */
            constructor(req: SWCH.Any) {
                this.schemes = schemes;
                /**
                 * Parse and validate data
                 * 
                 * 
                 * @param value_of - [value_of=true] True to execute valueOf, false to keep the native format
                 * @return SWCH.ParserSchemesResponse
                 */
                this.parser_schemes = async function(
                    value_of = true
                ): Promise<SWCH.ParserSchemesResponse>{
                    
                    return parserSchemes(
                        value_of,
                        this.schemes,
                        {...req.body, ...req.query},
                        true // exec Exception.bad_request if there are errors
                    );
                }
            }
        }
    }
}

export const Sandwich = new Sandwiches();
