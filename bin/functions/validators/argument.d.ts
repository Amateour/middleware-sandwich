import {
    argumentProps,
    argValid,
    compareProps,
    valueType,
    keyType,
    messageType,
    TypeValid,
    compareType
} from "../type";

/**
 *  list of validation functions
 */
export interface func_arguments {
    /**
     * Validate value max
     *
     * @param type
     * @param valid_value
     * @param value
     */
    max: ({type, valid_value, value}: argValid) => boolean,
    /**
     * Validate value min
     *
     * @param type
     * @param valid_value
     * @param value
     */
    min: ({type, valid_value, value}: argValid) => boolean,
    /**
     * validate value required
     *
     * @param valid_value
     * @param value
     */
    required: ({valid_value, value}: argValid) => boolean,
    /**
     * Validate value type
     *
     * @param valid
     * @param value
     * @param scheme
     */
    type: (valid: Function | string, value: any, scheme: compareType) => TypeValid,
    /**
     * Strictly validates the value of a data type
     *
     * @param strict true to validate or false not to validate strict mode
     * @param type Array
     * @param key data {occupation}
     * @param value "Developer"
     * @type {(strict: boolean, type: string, key: keyType, value: valueType)}
     */
    valid_strict: (strict: boolean, type: string, key: keyType, value: valueType) => any
}

/**
 * Validate a data type
 *
 * @param value value to validate "Developer"
 * @param key value key {occupation}
 * @param scheme scheme validation {type: String}
 * @interface compareProps
 */
export type valid_type = ({value, key, scheme}: compareProps) => TypeValid

/**
 *
 * @param value
 * @param key
 * @param scheme
 */
export type validation_customer = ({value, key, scheme}: compareProps) => any[]

/**
 * Extract data types to validate in the function valid_extract_argument
 * omitting those validated in the function valid_type
 *
 * @param scheme data: {type: Sandwich.String, strict: true, value: '100'}
 */
export type omit_argument = (scheme: object) => any[]

/**
 * Validate a schema against a value
 *
 * @param scheme data validation schema
 * @param value value to be validated example "Brayan Salgado"
 * @param type data type to validate example String
 * @param messages
 * @param key_main key main
 */
export type valid_extract_argument = (
    messages: messageType, scheme: object, value: valueType, type: any, key_main: keyType
) => any[]

/**
 * validate Message
 *
 * @param errors
 */
export type valid_resp_argument = (errors: Array<object>) => Promise<boolean>

/**
 * Validate an argument schema
 *
 * @param props data: {
 *     value: "example@sandwich.com"
 *     key: "email"
 *     scheme: {type: Sandwich.String, strict: true}
 * }
 * @type compareProps
 */
export type valid_argument = (props: compareProps) => Promise<{
    errors: Array<any>,
    success: boolean,
    value: String | Array<any> | Number | Boolean | Object 
}>

/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param req_body data body
 * @param schemes
 * @param key field key to validate
 */
export type get_value = (req_body: object, schemes: object, key: string | number) => any 

/**
 * This function validates all body data specified in the arguments
 *
 * @param value_of true stops returning the data to its primitive value of its instance
 * @param req_body request body {email: "example@sandwich.com"}
 * @param schemes schemes of validation { email: {type: Sandwich.String, strict: true} }
 */
export type argument = (value_of: boolean, req_body: object, schemes: object) => Promise<argumentProps>
