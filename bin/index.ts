import * as SWCH from '../functions';
import {push_against, toUpper} from './utils/help';
import {Message} from './utils/message';
import {argument, method, middleware, verifyErrors, Types} from './validators/validator';
import _ from 'lodash';

/**
 * 
 *
 * @param options
 * @return {Promise<object>}
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
             * @param middleware_resp middleware
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
 *
 * @param options
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
 * @param {boolean} value_of True to execute valueOf, false to keep the native format
 * @param {object} scheme scheme
 * @param {object} req_body data body request
 * @param {boolean} request if it is true, the errors checked by res.status (200) .json ({message: 'message'}) will be returned, if it is false it generates an exception that is replicated in the handler function (Sandwich.handler)
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
     * @param responseError bug check response 
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
 *
 *
 * @export
 * @class Sandwiches
 * @extends {Types}
 * @implements {SWCH.Sandwiches}
 */
export class Sandwiches extends Types implements SWCH.Sandwiches {
    /**
     * Validation schemes
     *
     * @type {SWCH.schemes}
     * @memberof Sandwiches
     */
    schemes: SWCH.schemes;
    /**
     * True to execute valueOf, false to keep the native format
     *
     * @type {boolean}
     * @memberof Sandwiches
     */
    value_of: boolean;
    /**
     * Creates an instance of Sandwiches.
     * 
     * @param {boolean} [value_of=true]
     * @param {*} [schemes={}]
     * @memberof Sandwiches
     */
    constructor(value_of = true, schemes = {}) {
        super(); 
        this.schemes = schemes;
        this.value_of = value_of;
    }
    /**
     * parse and validate request body data
     *
     * @param {SWCH.Any} body
     * @return {*} 
     * @memberof Sandwiches
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
     * @param {SWCH.routerProps} options
     * @return {*} 
     * @memberof Sandwiches
     */
    _(options: SWCH.routerProps) {
        return transform(options)
    }
    /**
     * Prepare the class to be used by routing
     *
     * @param {SWCH.Any} classRequest
     * @param {SWCH.middlewaresType} [middlewares]
     * @return {*} 
     * @memberof Sandwiches
     */
    handler(classRequest: SWCH.Any, middlewares?: SWCH.middlewaresType) {
        return async (req: SWCH.Any, res: SWCH.Any, next?: SWCH.Next) => {
            
            const $classRequest = new classRequest(req, res);
            const {arg} = $classRequest;
            /**
             * selecte methods
             *
             * @constant methods_list
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
             * @constant methods
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
                $classRequest.f = resp.f;
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
     * @function resource Returns a class called Resource, which loads the resources.
     *
     * @param {SWCH.schemes} schemes The validation schemes are passed to the this.schemes property of the Resource class, examples of schemes: 
     * {
     *  email: {type: Sandwich.String, required: true, strict: true}
     *  ...
     * }, 
     * @returns {SWCH.Resource} Class Resource
     */
    resource = (schemes: SWCH.schemes) => {
        return class Resource implements SWCH.Resource {
            /**
             * Validation schemes
             *
             * @type {SWCH.schemes} schemes
             */
            readonly schemes: SWCH.schemes;
            /**
             * Parse and validate data
             *
             * @type {SWCH.parserSchemes}
             */
            readonly parser_schemes: SWCH.parserSchemes;
            /**
             * Loads the data returned by the middleware, in case the promise is fulfilled.
             *
             * @type {SWCH.Any} f
             */
            f: SWCH.Any;
            /**
             * 
             *
             * @type {SWCH.Any}
             */
            request: SWCH.Any;
            /**
             * Creates an instance of Resource.
             * 
             * @param {SWCH.Any} req
             */
            constructor(req: SWCH.Any) {
                this.schemes = schemes;
                /**
                 * Parse and validate data
                 * 
                 * @function
                 * @param {boolean} [value_of=true] True to execute valueOf, false to keep the native format
                 * @return {*} 
                 */
                this.parser_schemes = async function parser_schemes(
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
