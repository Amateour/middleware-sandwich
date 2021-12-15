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
        value: props.validValue
    }),
    max: (props) => ({
        message: "maximum_characters",
        value: props.validValue
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
 * @param funcArguments -
 */
const funcArguments: SW.funcArguments = {
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
     * @param validValue -
     * @param value -
     */
    validation: ({validValue, value}) => validValue(value),
    /**
     * Validate value max
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    max: ({type, validValue, value}) => {
        if (typeof value === 'number'){
            return (value ?? 0) <= (validValue ?? 0);
        } else {
            const len = (type?.length ?? 0) ?? (type?.toString()?.length ?? 0);
            return len <= (validValue ?? 0);
        }

    },
    /**
     * Validate value min
     *
     * @param type -
     * @param validValue -
     * @param value -
     */
    min: ({type, validValue, value}) => {
        if (typeof value === 'number'){
            return (validValue ?? 0) >= (validValue ?? 0);
        } else {
            const len = (type?.length ?? 0) ?? (type?.toString()?.length ?? 0);
            return len >= (validValue ?? 0);
        }
    },
    /**
     * validate value required
     *
     * @param validValue -
     * @param value -
     */
    required: ({validValue, value}) => validValue ? (!!value || value === 0) : true,
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
    validStrict: (strict, type, key, value) => {
        const valid = validate[type];

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
async function validType ({value, key, scheme}: SW.compareProps): Promise<any> {
    const type = scheme['type'];
    const strict = scheme['strict'];
    const required = scheme['required'];

    if (type) {
        const name: string = type['type'];
        required && value ? funcArguments.validStrict(strict, name, key, value): null;
        if (value === null || value === undefined) return value;
        return funcArguments.type(value, type, scheme);
    } else {
        Exception.server_error({message: `${key} => ${value} no data type`});
    }
}

/**
 *
 * @param messages -
 * @param keyValid -
 */
function getMessage(messages: SW.messageType, keyValid: string) {
    if(messages) return messages[keyValid];
}

/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 * @param validValue - value of validation
 * @param keyValid - key main
 */
function validData(
    props: SW.compareProps, type: any, validValue: any, keyValid: string
): Promise<SW.argValid | boolean> {
    return new Promise((resolve) => {

        const {value, scheme, message: messages, key: key_main} = props;

        const funcValid = funcArguments[keyValid];
        const message = typeof messages  == 'string' ? messages : (
            messages ?? getMessage(messages, keyValid)
        );

        const messDefault = messageArgument[keyValid];

        if(!funcValid({validValue, value, type, scheme})) {
            resolve(message ?? messDefault({validValue, value, type, keyValid, key_main}));
        }

        resolve(false);
    })
}

/**
 * Validate a schema against a value
 *
 * @param props - data
 * @param type - data type to validate example String
 */
async function validExtractArgument (
    props: SW.compareProps, type: any
): Promise<(SW.argValid | boolean)[]> {
    const validResponse = [];
    const {scheme} = props;

    /**
     *
     */
    if(scheme['required']) {
        const resp = await validData(props, type, scheme['required'], 'required')
        if(resp) validResponse.push(resp);
    }

    /**
     *
     */
    if(scheme['min']){
        const resp = await validData(props, type, scheme['min'], 'min');
        if(resp) validResponse.push(resp);
    }

    /**
     *
     */
    if(scheme['max']) {
        const resp = await validData(props, type, scheme['max'], 'max');
        if(resp) validResponse.push(resp);
    }

    /**
     *
     */
    if(scheme['validation']) {
        const resp =await validData(props, type, scheme['validation'], 'validation')
        if(resp) validResponse.push(resp)
    }

    return validResponse;
}

/**
 * validate Message
 *
 * @param errors -
 */
async function validRespArgument (errors: (SW.argValid | boolean)[]): Promise<boolean> {
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
async function validArgument (props: SW.compareProps): Promise<SW.validArgumentResp> {

    const type =  await validType(props);
    const errors = await validExtractArgument(props, type);
    const success = await validRespArgument(errors);

    return {errors: errors, success, value: type}
}

/**
 * Extract the defined value from the req or in the schema
 * (any value passed by req will be replaced by the value is defined in the schema)
 *
 * @param reqBody - data body
 * @param scheme -
 * @param key - field key to validate
 */
function getValue(reqBody: object, scheme: SW.scheme, key: string | number): any {
    const defined_value = scheme['value'] ?? reqBody[key];
    return defined_value instanceof Function ? defined_value() : defined_value;
}

/**
 * This function validates all body data specified in the arguments
 *
 * @param valueOf - true stops returning the data to its primitive value of its instance
 * @param reqBody - request body
 * ```json
 * {email: "example@sandwich.com"}
 * ```
 * @param schemes - schemes of validation `{ email: {type: Sandwich.String, strict: true} }`
 */
export async function argument(
    valueOf: boolean, reqBody: object, schemes?: SW.schemes
): Promise<SW.argumentProps> {
    const resp = {};
    const body = {};
    const errors: SW.ErrorStatus[] = []

    if(!schemes) Exception.server_error({message: `schemes is ${schemes}`})

    for (const key in schemes) {
        const scheme = schemes[key] ?? null;
        if(scheme) {

            const validated = await validArgument({
                value: getValue(reqBody, scheme, key),
                key: key,
                message: scheme['message'],
                scheme: scheme
            });

            Object.defineProperty(resp, key, {
                enumerable: true,
                value: validated
            });

            Object.defineProperty(body, key, {
                enumerable: true,
                value: valueOf || !validated.value ? validated.value : validated.value.valueOf()
            });

            if (validated.errors.length) {
                errors.push({[key]: validated.errors})
            }

        }
    }

    return {
        argument: resp,
        body,
        errors
    };
}
