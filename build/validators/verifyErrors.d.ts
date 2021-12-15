import { ResponseVerifyErrors, ErrorStatus } from "../../functions";
/**
 * validate errors and send message
 *
 * @param errors -
 */
export declare function verifyErrors(errors: ErrorStatus[]): Promise<ResponseVerifyErrors | any>;
