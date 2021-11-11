import * as SW from '../../functions';

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
