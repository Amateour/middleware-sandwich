import { ResponseVerifyErrors } from "../../functions";
/**
 * validate errors and send message
 *
 * @param errors -
 */
export declare function verifyErrors(errors: object): Promise<ResponseVerifyErrors | any>;
