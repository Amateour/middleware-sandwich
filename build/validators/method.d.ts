import { methodType } from "../../functions";
/**
 * Validate the request method
 *
 * @param api_method - method allowed ["POST", "GET"] or "POST"
 * @param req_method - request method "POST"
 */
export declare function method(api_method: methodType, req_method: string): Promise<string>;
