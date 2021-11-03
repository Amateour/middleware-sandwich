import * as SWCH from '../functions';
import { Types } from './validators/validator';
/**
 * Execute validation functions (method, middleware)
 *
 * @param options - Configuration object for validation process
 * @return Promise<object>
 */
export declare const exec: SWCH.exec;
/**
 *
 * @param value_of - Determines how validated arguments and parameters are extracted.
 * @param scheme - scheme
 * @param req_body - data body request.
 * @param request - if it is true, the errors checked by `res.status(200).json ({message: 'message'})` will be returned, if it is false it generates an exception that is replicated in the handler function `Sandwich.handler`
 * @returns
 */
declare const parserSchemes: SWCH.parserSchemes;
/**
 * @alpha
 */
export declare class Sandwiches extends Types implements SWCH.Sandwiches {
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
    constructor(value_of?: boolean, schemes?: {});
    /**
     * parse and validate request body data
     *
     * @param body - Datos sujetos a validación
     * @return
     */
    parser_schemes(body: SWCH.Any): Promise<SWCH.ParserSchemesResponse>;
    /**
     *
     *
     * @param options -
     * @return
     */
    _(options: SWCH.routerProps): Promise<any>;
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
    handler(classRequest: SWCH.Any, middlewares?: SWCH.middlewaresType): (req: SWCH.Any, res: SWCH.Any, next?: SWCH.Next) => Promise<void>;
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
    resource: (schemes: any) => {
        new (req: SWCH.Any): {
            /**
             * Validation schemes
             *
             */
            readonly schemes: any;
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
        };
    };
}
export declare const Sandwich: Sandwiches;
export {};
