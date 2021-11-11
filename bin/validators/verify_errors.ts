import * as SW from '../../functions';
import {Exception} from "../utils/message";
import _ from 'lodash';

/**
 * validate errors and send message
 *
 * @param errors -
 * @param respActive -
 */
export const verifyErrors: SW.verify_errors = async (
    errors, respActive
) => {

    const response: SW.Any = {
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
        respActive ?
        Exception.bad_request(response) :
        Exception.error(response);
    } else {
        return response
    }
}