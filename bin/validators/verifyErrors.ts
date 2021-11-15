import * as SW from '../../functions';
import {isBrowser} from '../utils/help'
import {Exception} from "../utils/message";
import _ from 'lodash';

/**
 * validate errors and send message
 *
 * @param errors -
 */
export const verifyErrors: SW.verify_errors = async (
    errors
) => {

    const response: SW.Any = {
        errors: [],
        message: 'args_validation_successful'
    }

    const resp_err = _(errors)
        .map((value: any, key) => {
            return new Object({[key]: value.errors})
        })
        .filter((value: any) => _.find(value, (err) => err.length))
        .valueOf();

    if (resp_err.length) {
        response.errors = resp_err;
        response.message = 'args_validation_errors';
        isBrowser() ? Exception.error(response) : Exception.bad_request(response);
    } else {
        return response
    }
}