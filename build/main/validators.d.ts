import * as SW from "../../functions";
import { ParserSchemeFunction } from "../../functions";
/**
 * Analyze the values provided according to your schema.
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * ```json
 * {
 *     email: {type: Sandwich.String, required: true, strict: true},
 *     password: {type: Sandwich.String, required: true, strict: true, min: 8}
 * }
 * ```
 * @param values - data body request.
 * @returns
 */
export declare const parserSchemes: SW.HandlerParserSchemes;
/**
 * Types of validations
 */
export declare class Types implements SW.TypeValid {
    String: StringConstructor;
    Number: NumberConstructor;
    Array: ArrayConstructor;
    Boolean: BooleanConstructor;
    Object: ObjectConstructor;
}
export declare const Type: Types;
/**
 * @beta
 */
declare class Validators extends Types implements SW.ValidatorsClass {
    /**
     *
     */
    values: SW.valuesArgs;
    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: SW.schemes;
    /**
     * Boolean type property. Determines how validated arguments and parameters are extracted.
     * @defaultValue value_of=true
     */
    valueOf: SW.valueOf;
    /**
     * Creates an instance of Sandwiches.
     */
    constructor(schemes?: SW.schemes);
    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @returns ParserSchemesResponse
     */
    parserSchemes(values?: SW.valuesArgs): ParserSchemeFunction;
    reset(): void;
}
export default Validators;
export declare class ParserSchemes implements SW.ParserSchemesClass {
    /**
     *
     */
    constructor(valueOf?: boolean);
    /**
     *
     */
    parserSchemes(): ParserSchemeFunction;
    /**
     *
     * @param schemes -
     */
    addSchemes(schemes: SW.schemes): void;
    /**
     * The addScheme property must be represented in the child class as a function
     * within this function the schemas are loaded for the validation of the arguments
     *
     * @example
     *```ts
     * addScheme({type: Sandwich.String, required: true, strict: true}, ['email'])
     *```
     * @param scheme -
     * @param arg -
     */
    addScheme(scheme: SW.scheme, arg: string | string[]): void;
}
