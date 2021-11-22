import * as SW from "../../functions";
/**
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * @param values - data body request.
 * @returns
 */
export declare const parserSchemes: SW.HandlerParserSchemes;
/**
 * Types of validations
 */
export declare const Type: SW.Type;
/**
 * Types of validations
 */
export declare class Types implements SW.Types {
    String: SW.FunctionVoid | undefined;
    Number: SW.FunctionVoid | undefined;
    Array: SW.FunctionVoid | undefined;
    Boolean: SW.FunctionVoid | undefined;
    Object: SW.FunctionVoid | undefined;
}
declare type ValidatorCallback = (resolve: any) => void;
/**
 * @alpha
 */
declare class Validators extends Types implements SW.ValidatorsClass {
    /**
     *
     */
    readonly updateProperty: (fun: ValidatorCallback) => void;
    /**
     *
     * @private
     */
    private readonly callBacksProperty;
    /**
     *
     */
    values: SW.valuesArgs;
    /**
     * Object type property. List of validation schemes.
     * @defaultValue schemes={}
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
     * @return ParserSchemesResponse
     */
    parserSchemes(values?: SW.valuesArgs): Promise<SW.ParserSchemesResponse>;
    reset(): void;
}
export default Validators;
export declare class ParserSchemes implements SW.ParserSchemesClass {
    /**
     *
     */
    constructor();
    /**
     *
     */
    parserSchemes(): Promise<SW.ParserSchemesResponse>;
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
     *
     * addScheme({type: Sandwich.String, required: true, strict: true}, ['email'])
     *
     * @param scheme -
     * @param arg -
     */
    addScheme(scheme: SW.scheme, arg: string | string[]): void;
}
