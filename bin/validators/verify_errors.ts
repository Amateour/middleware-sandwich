import * as SWCH from '../functions';
import {Exception} from "../utils/message";
import _ from '../libs/lodash';

/**
 * validate errors and send message
 *
 * @param errors
 */
export const verify_errors: SWCH.verify_errors = async (errors) => {

    const resp_err = _.all(errors)
        .map((value, key) => new Object({[key]: value.errors}))
        .filter((value) => _.find(value, (err) => err.length))
        .valueOf();

    if (resp_err.length) {
        Exception.bad_request({
            message: "args_validation_errors",
            errors: resp_err
        })
    } else {
        return resp_err
    }
}