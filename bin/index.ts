import * as SWCH from '../functions';
import {push_against, toUpper} from './utils/help';
import {Message} from './utils/message';
import {argument, method, middleware, verify_errors, Types} from './validators/validator';
import _ from 'lodash';

/**
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
 * @param value_of 
 * @param scheme 
 * @param req_body 
 * @param request 
 * @returns 
 */
const parser_schemes: SWCH.parser_schemes = async (
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
    responseError = await verify_errors(result_argument.argument, request);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: responseError.errors,
        message: responseError.message
    }
}

/**
 * class Sandwiches
 *
 * @class {Sandwiches}
 */
export class Sandwiches extends Types implements SWCH.Sandwiches {

    scheme: SWCH.Scheme;
    value_of: boolean;

    constructor(value_of = true, scheme = {}) {
        super(); 
        this.scheme = scheme;
        this.value_of = value_of;
    }

    /**
     * 
     */
    async parser_schemes(body: SWCH.Any)
    {
        return await parser_schemes(
            this.value_of, this.scheme, body
        )
    }

    /**
     *
     * @param options
     */
    _(options: SWCH.routerProps) {
        return transform(options)
    }

    /**
     *
     * @param classRequest
     * @param middlewares
     */
    handler(classRequest: SWCH.Any, middlewares?: SWCH.middlewaresType) {
        return async (req: SWCH.Any, res: SWCH.Any) => {
            const $classRequest = new classRequest(req, res);
            const {arg} = $classRequest;
            
            const methods_list: SWCH.AnyArray = await _.map([
                'post',
                'get',
                'put',
                'delete'
            ], (val) => _.get($classRequest, val) ? val: undefined);       

            /**
             * list methods
             *
             * @param methods
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
                //$classRequest.arg = resp.argument;
                //$classRequest.body = resp.body;
                //$classRequest.errors = resp.errors;
                // $classRequest.schemes = resp.schemes;
                $classRequest.request = {
                    success: resp.success,
                    method: resp.method
                };
                
                push_against($classRequest, req, res)
                    .catch((err)=> err);

            }).catch((err) => err);
        
            if(errors) Message.response(res, errors.statusCode, errors);
        }
    }

    /**
     *
     * @param scheme
     */
    Req = (scheme: SWCH.Scheme) => {
        return class add_arguments implements SWCH.add_arguments {
            readonly arg: SWCH.Any;
            readonly parser_schemes: SWCH.parser_schemes;
            f: SWCH.Any;
            request: SWCH.Any;
    
            constructor(req: SWCH.Any) {
                this.arg = scheme;
                this.parser_schemes = async function (value_of = true, scheme, body)
                {
                    return parser_schemes(
                        value_of,
                        scheme ?? this.arg,
                        body ?? {...req.body, ...req.query},
                        true // exec Exception.bad_request if there are errors
                    );
                }
            }
    
        }
    }
}

export const Sandwich = new Sandwiches();
