import * as SWCH from './functions';
import {push_against, toUpper} from './utils/help';
import {Message} from './utils/message';
import {argument, method, middleware, verify_errors, Types} from './validators/validator';

/**
 *
 * @param options
 * @return {Promise<object>}
 */
export const exec: SWCH.exec = async (options) => {
    let req_method = '';

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
    return new Promise((resolve) => {
        exec(options)
            .then((resp) => resolve(resp) )
            .catch(err => Message.errors(options.res, err));
    })
}

const parser_schemes: SWCH.parser_schemes = async (value_of, req_body, scheme) => {
    const
    /**
     *
     * @param result_argument result argument
     */
    result_argument = await argument(value_of, req_body, scheme),
    /**
     *
     * @param verify_errors verify errors
     */
    errors = await verify_errors(result_argument.argument);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: errors
    }
}

/**
 * class Sandwiches
 *
 * @class {Sandwiches}
 */
export class Sandwiches extends Types implements SWCH.Sandwiches {

    /**
     *
     * @param options
     */
    _(options) {
        return transform(options)
    }

    /**
     *
     * @param classRequest
     * @param middlewares
     */
    handler(classRequest, middlewares) {
        return async (req, res) => {
            try {
                const $classRequest = new classRequest(req, res);
                const {arg, get, post, put, delete: deleted} = $classRequest;

                /**
                 * list methods
                 *
                 * @param methods
                 */
                const methods = toUpper([
                    get?.name,
                    post?.name,
                    put?.name,
                    deleted?.name
                ])

                const data_transform = {
                    middleware: middlewares,
                    argument: arg,
                    method: methods,
                    req: req,
                    res: res
                }

                transform(data_transform).then((resp) => {
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
                        .catch((err)=> Message.errors(res, err));

                }).catch((err) =>  Message.errors(res, err));

            }catch (err) {
                Message.errors(res, err)
            }
        }
    }

    /**
     *
     * @param scheme
     */
    Req = (scheme) => class add_arguments implements SWCH.add_arguments {
        arg;
        parser_schemes;
        f;
        request;

        constructor(req) {
            this.arg = scheme;
            this.parser_schemes = async function (value_of = true, scheme)
            {
                return await parser_schemes(
                    value_of, {...req.body, ...req.query}, scheme ?? this.arg
                )
            }
        }

    }
}

export const Sandwich = new Sandwiches()
