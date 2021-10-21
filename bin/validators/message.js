import {MessageArgument} from "./types";

export const argument = {
    validation: (props) => ({
        message: `${props.key}_${props.key_validation}`
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
