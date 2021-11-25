import {
    argValid,
    valueType,
    keyType,
    TypeValid,
    scheme,
    FunctionVoid
} from "../utils/typeUtil";

/**
 *  list of validation functions
 */
export interface func_arguments {
    validation: ({type, valid_value, value}: argValid) => boolean,
    /**
     * Validate value max
     *
     * @param type -
     * @param valid_value -
     * @param value -
     */
    max: ({type, valid_value, value}: argValid) => boolean,
    /**
     * Validate value min
     *
     * @param type -
     * @param valid_value -
     * @param value -
     */
    min: ({type, valid_value, value}: argValid) => boolean,
    /**
     * validate value required
     *
     * @param valid_value -
     * @param value -
     */
    required: ({valid_value, value}: argValid) => boolean,
    /**
     * Validate value type
     *
     * @param valid -
     * @param value -
     * @param scheme -
     */
    type: (valid: FunctionVoid | string, value: any, scheme: scheme) => TypeValid,
    /**
     * Strictly validates the value of a data type
     *
     * @param strict - true to validate or false not to validate strict mode
     * @param type - Array
     * @param key - data (occupation)
     * @param value - `Developer`
     * ```json
     * {(strict: boolean, type: string, key: keyType, value: valueType)}
     * ```
     */
    valid_strict: (strict: boolean | undefined, name: string, key: keyType, value: valueType) => any
}

/**
 * Validate an argument schema
 */
export type validArgumentResp = {
    errors: any[],
    success: boolean,
    value: string | any[] | number | boolean | object
}
