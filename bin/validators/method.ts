import * as SWCH from '../functions';
import {Exception} from "../utils/message";

/**
 * Validate the request method
 *
 * @param api_method method allowed ["POST", "GET"] or "POST"
 * @param req_method request method "POST"
 */
export const method: SWCH.method = async (api_method, req_method): Promise<string> => {
    const apiMethod = api_method instanceof Array ? api_method : [api_method];
    if (!apiMethod.includes(req_method)){
        Exception.bad_request({
            message: `HTTP ${req_method} request is not allowed`
        });
    }
    return req_method;
}
