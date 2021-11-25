import * as SW from '../../functions';
/**
 * This function validates all body data specified in the arguments
 *
 * @param value_of - true stops returning the data to its primitive value of its instance
 * @param req_body - request body
 * ```json
 * {email: "example@sandwich.com"}
 * ```
 * @param schemes - schemes of validation `{ email: {type: Sandwich.String, strict: true} }`
 */
export declare function argument(value_of: boolean, req_body: object, schemes?: SW.schemes): Promise<SW.argumentProps>;
