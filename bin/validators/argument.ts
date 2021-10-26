import _ from 'lodash';
import * as SWCH from '../../functions'; 
import {Exception} from '../utils/message';
import {validate} from "../utils/help";
import {messageArgument} from "./message";

/**
 *  list of validation functions
 *
 * @param func_arguments
 */
const func_arguments: SWCH.func_arguments = {
    /**
     * Validate value max
     *
     * @param type
     * @param valid_value
     * @param value
     */
    max: ({type, valid_value, value}) => {
        if (typeof value === 'number'){
            return (value ?? 0) <= (valid_value ?? 0);
        } else {
            const len = (type?.length ?? 0) ?? (type?.toString()?.length ?? 0);
            return len <= (valid_value ?? 0);
        }

    },
    /**
     * Validate value min
     *
     * @param type
     * @param valid_value
     * @param value
     */
    min: ({type, valid_value, value}) => {
        if (typeof value === 'number'){
            return (valid_value ?? 0) >= (valid_value ?? 0);
        } else {
            const len = (type?.length ?? 0) ?? (type?.toString()?.length ?? 0);
            return len >= (valid_value ?? 0);
        }
    },
    /**
     * validate value required
     *
     * @param valid_value
     * @param value
     */
    required: ({valid_value, value}) => valid_value ? (!!value || value === 0) : true,
    /**
     * Validate value type
     *
     * @param valid
     * @param value
     * @param scheme
     */
     type: (value, func, scheme) => {
        const list_type = ['String', 'Number', 'Object'];
        
        switch (func.name) {
            case 'Array': return func.from(value);
            default:
                if (list_type.includes(func.name)){
                    return new func(value)
                }
                return func(value, scheme);
        }
    },
    /**
     * Strictly validates the value of a data type
     *
     * @param strict true to validate or false not to validate strict mode
     * @param type Array
     * @param key data {occupation}
     * @param value "Developer"
     */
    valid_strict: (strict, type, key, value) => {
        const valid = _.get(validate, type);

        if (strict && valid instanceof Function) {
            !valid(value) ? Exception.bad_request({
                message: "args_validation_errors",
                errors: [{
                    [key]: [messageArgument.strict({key, type})]
                }]
            }): true
        }
    }
}

/**
 * Validate a data type
 *
 * @param value value to validate "Developer"
 * @param key value key {occupation}
 * @param scheme scheme validation {type: String}
 */
const valid_type: SWCH.valid_type = ({value, key, scheme}) => {
    const type = _.get(scheme, 'type');
    const strict = _.get(scheme, 'strict');
    const required = _.get(scheme, 'required');

    if (type) {
        required && value ? func_arguments.valid_strict(strict, type.name, key, value): null;
        if (value === null || value === undefined) return value;
        return func_arguments.type(value, type, scheme);
    } else {
        Exception.server_error({message: `${key} => ${value} no data type`});
    }
}

/**
 * custom validation, for the data type specified in the argument
 * 
 * example 
 * email: {
 * type: Sandwich.String, validation: (value: strin) => typeof value == 'string'
 * }
 *
 * @param value
 * @param key
 * @param scheme
 */
const validation_custom: SWCH.validation_custom = ({value, key, scheme}) => {
    const {validation} = scheme;
    return _(validation).map((func: (value: any) => any, key_validation: string | number) => {
        const messDefault = _.get(messageArgument, 'validation')
       return func(value) ? messDefault({key, key_validation}) : false;
    }).filter((value: any) => value).valueOf();
}

/**
 * Extract data types to validate in the function valid_extract_argument
 * omitting those validated in the function valid_type
 *
 * @param scheme data: {type: Sandwich.String, strict: true, value: '100'}
 */
const omit_argument: SWCH.omit_argument = (scheme) => {
    return _.omit(scheme, ['type', 'strict', 'message', 'value', 'validation']);
}

/**
 * Validate a schema against a value
 *
 * @param scheme data validation schema
 * @param value value to be validated example "Brayan Salgado"
 * @param type data type to validate example String
 * @param messages
 * @param key_main key main
 */
const valid_extract_argument: SWCH.valid_extract_argument = (
    messages, scheme, value, type, key_main
) => {
    return _(scheme)
        .map((valid_value, key) => {
        const func_valid = _.get(func_arguments, key);
        const message = _.get(messages, key);
        const messDefault = _.get(messageArgument, key)
        return !func_valid({valid_value, value, type, scheme}) &&
            (message ?? messDefault({valid_value, value, type, key, key_main}));
    }).filter((value) => value).valueOf();
}

/**
 * validate Message
 *
 * @param errors
 */
const valid_resp_argument: SWCH.valid_resp_argument = async (errors) => {
    return !errors.length;
}

/**
 * Validate an argument schema
 *
 * @param props data: {
 *     value: "example@sandwich.com"
 *     key: "email"
 *     scheme: {type: Sandwich.String, strict: true}
 * }
 */
const valid_argument: SWCH.valid_argument = async (props) => {
    const {value, scheme, message, key} = props;

    const type =  await valid_type(props);
    const valid_errors = await validation_custom(props);
    const extract_scheme = await omit_argument(scheme);
    const errors = await valid_extract_argument(message, extract_scheme, value, type, key);
    const success = await valid_resp_argument(errors)

    return {errors: valid_errors.concat(errors), success, value: type}
}

/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param req_body data body
 * @param schemes
 * @param key field key to validate
 */
const get_value: SWCH.get_value = (req_body, schemes, key) => {
    const has_value = _.has(schemes, 'value');
    const defined_value = has_value ? _.get(schemes, 'value') : _.get(req_body, key);
    return defined_value instanceof Function ? defined_value() : defined_value;
}

/**
 * This function validates all body data specified in the arguments
 *
 * @param value_of true stops returning the data to its primitive value of its instance
 * @param req_body request body {email: "example@sandwich.com"}
 * @param schemes schemes of validation { email: {type: Sandwich.String, strict: true} }
 */
export const argument: SWCH.argument = async (value_of, req_body, schemes) => {
    let resp = {};
    let body = {};

    for (const key in schemes) {
        const scheme = _.has(schemes, key) ? _.get(schemes, key): null;
        resp = _.assign({
            [key]: await valid_argument({
                value: get_value(req_body, scheme, key),
                key: key,
                message: _.get(scheme, 'message'),
                scheme: scheme
            })
        }, resp);
        const value = _.get(resp, key).value;
        body = _.assign({[key]: value_of || !value ? value : value.valueOf()}, body);
    }

    return {
        argument: resp,
        body: body
    };
}
