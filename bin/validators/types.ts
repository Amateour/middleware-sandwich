import * as SWCH from '../../functions'; 

/**
 * Types of validatios
 */
export const Type: SWCH.Type = {
    String: String,
    Number: Number,
    Array: Array,
    Boolean: Boolean,
    Object: Object,
}

/**
 * Types of validatios
 */
export class Types implements SWCH.Types {
    String = Type.String
    Number = Type.Number
    Array = Type.Array
    Boolean = Type.Boolean
    Object = Type.Object
}
