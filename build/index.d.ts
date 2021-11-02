import * as SWCH from '../functions';
import { Types } from './validators/validator';
/**
 *
 *
 * @param options
 * @return {Promise<object>}
 */
export declare const exec: SWCH.exec;
/**
 *
 * @param {boolean} value_of True to execute valueOf, false to keep the native format
 * @param {object} scheme scheme
 * @param {object} req_body data body request
 * @param {boolean} request if it is true, the errors checked by res.status (200) .json ({message: 'message'}) will be returned, if it is false it generates an exception that is replicated in the handler function (Sandwich.handler)
 * @returns
 */
declare const parserSchemes: SWCH.parserSchemes;
/**
 *
 *
 * @export
 * @class Sandwiches
 * @extends {Types}
 * @implements {SWCH.Sandwiches}
 */
export declare class Sandwiches extends Types implements SWCH.Sandwiches {
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
    constructor(value_of?: boolean, schemes?: {});
    /**
     * parse and validate request body data
     *
     * @param {SWCH.Any} body
     * @return {*}
     * @memberof Sandwiches
     */
    parser_schemes(body: SWCH.Any): Promise<SWCH.ParserSchemesResponse>;
    /**
     *
     *
     * @param {SWCH.routerProps} options
     * @return {*}
     * @memberof Sandwiches
     */
    _(options: SWCH.routerProps): Promise<any>;
    /**
     * Prepare the class to be used by routing
     *
     * @param {SWCH.Any} classRequest
     * @param {SWCH.middlewaresType} [middlewares]
     * @return {*}
     * @memberof Sandwiches
     */
    handler(classRequest: SWCH.Any, middlewares?: SWCH.middlewaresType): (req: SWCH.Any, res: SWCH.Any, next?: SWCH.Next) => Promise<void>;
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
    resource: (schemes: any) => {
        new (req: SWCH.Any): {
            /**
             * Validation schemes
             *
             * @type {SWCH.schemes} schemes
             */
            readonly schemes: any;
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
        };
    };
}
export declare const Sandwich: Sandwiches;
export {};
