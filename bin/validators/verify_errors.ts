import * as SWCH from '../../functions';
import _ from 'lodash';
import {Exception} from "../utils/message";

/**
 * validate errors and send message
 *
 * @param errors
 */
export const verifyErrors: SWCH.verify_errors = async (
    errors, request
) => {

    const response: SWCH.Any = {
        errors: [],
        message: 'args_validation_successful'
    }
    
    const resp_err = _(errors)
        .map((value: any, key) => new Object({[key]: value.errors}))
        .filter((value: any) => _.find(value, (err) => err.length))
        .valueOf();

    if (resp_err.length) {
        response.errors = resp_err;
        response.message = 'args_validation_errors';
        request ? 
        Exception.bad_request(response) : 
        Exception.error(response);
    } else {
        return response
    }
}