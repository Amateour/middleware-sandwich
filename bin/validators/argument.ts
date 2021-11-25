import _ from 'lodash';
import * as SW from '../../functions';
import {Exception} from '../utils/message';
import {validate} from "../utils/help";

/**
 *
 * Response messages due to validation failure
 */
const messageArgument: SW.MessageArgument = {
    validation: () => ({
        message: `validation_custom`
    }),
    required: () => ({
        message: "required_field"
    }),
    min: (props) => ({
        message: "minimum_characters",
        value: props.valid_value
    }),
    max: (props) => ({
        message: "maximum_characters",
        value: props.valid_value
    }),
    strict: (props) => ({
        message: "{key}_expected_data_type_{type}"
            .replace('{key}', props.key)
            .replace('{type}', props.type)
            .toLowerCase()
    })
}

/**
 *  list of validation functions
 *
 * @param func_arguments -
 */
const func_arguments: SW.func_arguments = {
    /**
     *  * custom validation, for the data type specified in the argument
     *
     * @example
     * ```json
     * {
     *    email: {
     *    type: Sandwich.String, validation: (value: string) => typeof value == 'string'
     *  }
     * }
     * ```
     * @param valid_value -
     * @param value -
     */
    validation: ({valid_value, value}) => valid_value(value),
    /**
     * Validate value max
     *
     * @param type -
     * @param valid_value -
     * @param value -
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
     * @param type -
     * @param valid_value -
     * @param value -
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
     * @param valid_value -
     * @param value -
     */
    required: ({valid_value, value}) => valid_value ? (!!value || value === 0) : true,
    /**
     * Validate value type
     *
     * @param value -
     * @param func -
     * @param scheme -
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
     * @param strict - true to validate or false not to validate strict mode
     * @param type - Array
     * @param key - data (occupation)
     * @param value - `Developer`
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
 * @param value - value to validate "Developer"
 * @param key - value key (occupation)
 * @param scheme - scheme validation
 * ```json
 * {type: String}
 * ```
 */
async function valid_type ({value, key, scheme}: SW.compareProps): Promise<any> {
    const type = _.get(scheme, 'type');
    const strict = _.get(scheme, 'strict');
    const required = _.get(scheme, 'required');

    if (type) {
        const name: string = _.get(type, 'type');
        required && value ? func_arguments.valid_strict(strict, name, key, value): null;
        if (value === null || value === undefined) return value;
        return func_arguments.type(value, type, scheme);
    } else {
        Exception.server_error({message: `${key} => ${value} no data type`});
    }
}

/**
 * Extract data types to validate in the function valid_extract_argument
 * omitting those validated in the function valid_type
 *
 * @param scheme - data: `{type: Sandwich.String, strict: true, value: '100'}`
 */
function omit_argument(scheme: SW.scheme): any {
    return _.omit(scheme, ['type', 'strict', 'message', 'value']);
}

/**
 * Validate a schema against a value
 *
 * @param messages -
 * @param scheme - data validation schema
 * @param value - value to be validated example "Brayan Salgado"
 * @param type - data type to validate example String
 * @param key_main - key main
 */
async function valid_extract_argument (
    messages: SW.messageType, scheme: SW.scheme, value: SW.valueType, type: any, key_main: SW.keyType
): Promise<SW.argValid[]> {
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
 * @param errors -
 */
async function valid_resp_argument (errors: object[]): Promise<boolean> {
    return !errors.length;
}

/**
 * Validate an argument schema
 *
 * @param props - data 
 * 
 * @example
 * ```json
 * {
 *     value: "example@sandwich.com"
 *     key: "email"
 *     scheme: {type: Sandwich.String, strict: true}
 * }
 * ```
 */
async function valid_argument (props: SW.compareProps): Promise<SW.validArgumentResp> {
    const {value, scheme, message, key} = props;

    const type =  await valid_type(props);
    const extract_scheme = await omit_argument(scheme);
    const errors = await valid_extract_argument(message, extract_scheme, value, type, key);
    const success = await valid_resp_argument(errors);

    return {errors: errors, success, value: type}
}

/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param req_body - data body
 * @param scheme -
 * @param key - field key to validate
 */
function get_value(req_body: object, scheme: SW.scheme, key: string | number): any {
    const has_value = _.has(scheme, 'value');
    const defined_value = has_value ? _.get(scheme, 'value') : _.get(req_body, key);
    return defined_value instanceof Function ? defined_value() : defined_value;
}

/**
 * This function validates all body data specified in the arguments
 *
 * @param value_of - true stops returning the data to its primitive value of its instance
 * @param req_body - request body
 * ```json
 * {email: "example@sandwich.com"}
 * ```
 * @param schemes - schemes of validation `{ email: {type: Sandwich.String, strict: true} }`
 */
export async function argument(
    value_of: boolean, req_body: object, schemes?: SW.schemes
): Promise<SW.argumentProps> {
    let resp = {};
    let body = {};

    if(!schemes) Exception.server_error({message: `schemes is ${schemes}`})

    for (const key in schemes) {
        const scheme = _.has(schemes, key) ? _.get(schemes, key): null;
        if(scheme)
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
