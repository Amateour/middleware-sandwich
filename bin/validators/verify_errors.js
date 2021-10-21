import {Exception} from "./message";

const _ = require('lodash');

/**
 * validate errors and send message
 *
 * @param errors
 */
export  const verify_errors = async (errors) => {

    const resp_err = _(errors)
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