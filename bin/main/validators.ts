import * as SW from "../../functions";
import {argument} from "../validators/argument";
import {verifyErrors} from "../validators/verifyErrors";

/**
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * @param values - data body request.
 * @returns
 */
export const parserSchemes: SW.HandlerParserSchemes = async (
    valueOf, schemes, values
) => {
    const
        /**
         *
         * @param result_argument result argument
         */
        result_argument = await argument(valueOf ?? true, values ?? {}, schemes),
        /**
         * check for errors in arguments
         *
         * @param responseError - bug check response
         */
        responseError = await verifyErrors(result_argument.argument);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: responseError.errors,
        message: responseError.message
    }
}

/**
 * Types of validations
 */
export const Type: SW.Type = {
    String: String,
    Number: Number,
    Array: Array,
    Boolean: Boolean,
    Object: Object,
}

/**
 * Types of validations
 */
export class Types implements SW.Types {
    String = Type.String
    Number = Type.Number
    Array = Type.Array
    Boolean = Type.Boolean
    Object = Type.Object
}


/**
 * @alpha
 */
class Validators extends Types implements SW.ValidatorsClass {
    /**
     *
     */
    values: SW.valuesArgs | undefined = undefined;
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
    constructor(valueOf = true, schemes: object = {}) {
        super();
        this.schemes = schemes;
        this.valueOf = valueOf;
    }

    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @return ParserSchemesResponse
     */
    parserSchemes(values?: SW.valuesArgs): Promise<SW.ParserSchemesResponse>
    {
        return parserSchemes(
            this.valueOf, this.schemes, this.values ?? values
        )
    }
}

export default Validators;
