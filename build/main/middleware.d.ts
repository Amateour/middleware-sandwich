import * as SW from '../../functions';
import { Types } from '../validators/validator';
import Routers from './routers';
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
export declare class Resource implements SW.Resource {
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
    private argsActive;
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
    addArgs: any;
    /**
     * Creates an instance of Resource.
     *
     * @param req - http request functions
     */
    constructor(req: any);
    /**
     *
     * @param schemes -
     * @param arg -
     */
    parser(schemes: SW.schemes, arg: string | string[]): Promise<unknown>;
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
    static args(schemes: SW.schemes): SW.HandlerResource;
}
/**
 * @alpha
 */
export declare class Sandwiches extends Types implements SW.Sandwiches {
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
    constructor(value_of?: boolean, schemes?: {});
    /**
     * parse and validate request body data
     *
     * @param body - Data subject to validation
     * @return
     */
    parser_schemes(body: SW.Any): Promise<SW.ParserSchemesResponse>;
    /**
     *
     *
     * @param options -
     * @return
     * @deprecated
     */
    _(options: SW.routerProps): Promise<any>;
}
/**
 *
 */
declare class Sandwich extends Sandwiches implements SW.SandwichClass {
    /**
     *
     */
    handler: (classRequest: SW.HandlerResource, middlewares?: SW.middlewares | undefined) => (req: any, res: any, next?: any) => Promise<void>;
    /**
     *
     * @param app
     */
    routers: (app: SW.Routers.router) => Routers;
    /**
     *
     */
    resource: typeof Resource;
}
declare const _default: Sandwich;
export default _default;
