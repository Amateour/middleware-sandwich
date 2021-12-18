import { ParserSchemeFunction, ParserSchemesClass, HandlerParserSchemes, TypeValid, ValidatorsClass, valuesArgs, schemes, scheme, valueOf } from "../../functions";
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
 * @returns HandlerParserSchemes
 */
export declare const parserSchemes: HandlerParserSchemes;
/**
 * Types of validations
 */
export declare class Types implements TypeValid {
    String: StringConstructor;
    Number: NumberConstructor;
    Array: ArrayConstructor;
    Boolean: BooleanConstructor;
    Object: ObjectConstructor;
}
/**
 * Instance Types
 */
export declare const Type: Types;
/**
 * A Validators class, with functions that allow rigorously validating
 * data, according to a specific pattern (a schema).
 *
 * @remarks
 * A schema determines the validation pattern of a value, and if it
 * does not meet the conditions of the pattern, an exception is
 * thrown with the return of an array of the errors found.
 *
 * @beta
 */
declare class Validators extends Types implements ValidatorsClass {
    /**
     * values to be validated
     * @defaultValue undefined
     */
    values: valuesArgs;
    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: schemes;
    /**
     * Boolean type property. Determines how validated arguments
     * and parameters are extracted.
     * @defaultValue true
     */
    valueOf: valueOf;
    /**
     * Creates an instance of Sandwiches.
     */
    constructor(schemes?: schemes);
    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @returns ParserSchemesResponse
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction;
    /**
     * Reset data:
     * ```ts
     *  this.valueOf = true;
     *  this.schemes = {};
     *  this.values = undefined;
     * ```
     */
    reset(): void;
}
export default Validators;
export declare class ParserSchemes implements ParserSchemesClass {
    /**
     * instance ParserSchemes
     */
    constructor(valueOf?: boolean);
    /**
     * Activating the schema validation functions
     */
    parserSchemes(values?: valuesArgs): ParserSchemeFunction;
    /**
     * add schemes
     *
     * @param schemes - Validations schemes
     */
    addSchemes(schemes: schemes): void;
    /**
     * The addScheme property must be represented in the child class as a function
     * within this function the schemas are loaded for the validation of the arguments
     *
     * @example
     *```ts
     * addScheme({type: Sandwich.String, required: true, strict: true}, ['email'])
     *```
     * @param scheme - Validations scheme
     * @param arg - Name of the argument to validate, can be a string or an array of strings.
     *
     * @example
     * example param arg:
     * ```ts
     * 'password' or ['password', 'passwordConfirm']
     * ```
     *
     */
    addScheme(scheme: scheme, arg: string | string[]): void;
}
