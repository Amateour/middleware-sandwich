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
 * class Sandwiches
 *
 * @class {Sandwiches}
 */
export declare class Sandwiches extends Types implements SWCH.Sandwiches {
    scheme: SWCH.Scheme;
    value_of: boolean;
    constructor(value_of?: boolean, scheme?: {});
    /**
     * parse and validate request body data
     */
    parser_schemes(body: SWCH.Any): Promise<SWCH.ParserSchemesResponse>;
    /**
     *
     * @param options
     */
    _(options: SWCH.routerProps): Promise<any>;
    /**
     *
     * @param classRequest
     * @param middlewares
     */
    handler(classRequest: SWCH.Any, middlewares?: SWCH.middlewaresType): (req: SWCH.Any, res: SWCH.Any, next?: SWCH.Next) => Promise<void>;
    /**
     *
     *
     * @param scheme
     */
    resource: (scheme: any) => {
        new (req: SWCH.Any): {
            readonly arg: SWCH.Any;
            readonly parser_schemes: SWCH.parserSchemes;
            f: SWCH.Any;
            request: SWCH.Any;
        };
    };
}
export declare const Sandwich: Sandwiches;
export {};
