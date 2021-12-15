import {isBrowser} from '../utils/help'
import {Exception} from "../utils/message";
import {ResponseVerifyErrors, ErrorStatus} from "../../functions";

/**
 * validate errors and send message
 *
 * @param errors -
 */
export async function verifyErrors(
    errors: ErrorStatus[]
): Promise<ResponseVerifyErrors | any> {

    const response: ResponseVerifyErrors = {
        errors: [],
        message: 'args_validation_successful'
    }

    if (errors.length) {
        response.errors = errors;
        response.message = 'args_validation_errors';
        isBrowser() ? Exception.error(response) : Exception.bad_request(response);
    } else {
        return response
    }
}
