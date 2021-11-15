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
/**
 * @alpha
 */
declare class Validators extends Types implements SW.ValidatorsClass {
    /**
     *
     */
    values: SW.valuesArgs | undefined;
    /**
     * Object type property.
     *
     */
    schemes: SW.schemes;
    /**
     * Boolean type property.
     *
     */
    valueOf: SW.valueOf;
    /**
     * Creates an instance of Sandwiches.
     *
     * @param valueOf - Determines how validated arguments and parameters are extracted.
     * @defaultValue value_of=true
     * @param schemes - List of validation schemes.
     * @defaultValue schemes={}
     */
    constructor(valueOf?: boolean, schemes?: object);
    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @return ParserSchemesResponse
     */
    parserSchemes(values?: SW.valuesArgs): Promise<SW.ParserSchemesResponse>;
}
export default Validators;
