import * as SW from "../../functions";
import {parserSchemes} from "./middleware";

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
     * @private
     */
    private readonly resActive: any;
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
     * @param resActive -
     * @defaultValue schemes={}
     */
    constructor(valueOf = true, schemes: object = {}, resActive = false) {
        super();
        this.schemes = schemes;
        this.valueOf = valueOf;
        this.resActive = resActive;
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
            this.valueOf, this.schemes, this.values ?? values, this.resActive
        )
    }
}

export default Validators;
