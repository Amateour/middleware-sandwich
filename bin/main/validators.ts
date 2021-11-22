import * as SW from "../../functions";
import {requestGet} from '../utils/contextHttp';
import {argument} from "../validators/argument";
import {verifyErrors} from "../validators/verifyErrors";
import {ValidatorCallback} from "../../functions";

/**
 * Analyze the values provided according to your schema.
 *
 * @param valueOf - Determines how validated arguments and parameters are extracted.
 * @param schemes - schemes
 * ```json
 * {
 *     email: {type: Sandwich.String, required: true, strict: true},
 *     password: {type: Sandwich.String, required: true, strict: true, min: 8}
 * }
 * ```
 * @param values - data body request.
 * @returns
 */
export const parserSchemes: SW.HandlerParserSchemes = async (
    valueOf, schemes, values
) => {
    const
        /**
         *
         * @param result_argument - result argument
         */
        result_argument = await argument(valueOf ?? true, values ?? {}, schemes),
        /**
         * check for errors in arguments
         *
         * @param responseError - bug check response
         */
        responseError = await verifyErrors(result_argument.argument);

    return {
        schemes: result_argument.argument,
        args: result_argument.body,
        errors: responseError.errors,
        message: responseError.message
    }
}

/**
 * Types of validations
 */
export class Types implements SW.Types {
    String = String
    Number = Number
    Array = Array
    Boolean = Boolean
    Object = Object
}

export const Type = new Types();

/**
 * @beta
 */
class Validators extends Types implements SW.ValidatorsClass {
    /**
     * @readonly
     */
    readonly updateProperty: (funUpdate: SW.ValidatorCallback) => void;
    /**
     *
     */
    values: SW.valuesArgs = undefined;
    /**
     * Object type property. List of validation schemes.
     * @defaultValue object
     */
    schemes: SW.schemes = {};
    /**
     * Boolean type property. Determines how validated arguments and parameters are extracted.
     * @defaultValue value_of=true
     */
    valueOf: SW.valueOf = true;
    /**
     * Creates an instance of Sandwiches.
     */
    constructor(schemes?: SW.schemes) {
        super();
        this.schemes = schemes ?? this.schemes;
        this.updateProperty = (funUpdate: ValidatorCallback) => {
            return new Promise((resolve) => {
                funUpdate(resolve);
            }).then(({values, valueOf, schemes}: any) => {
                this.values = Object.assign(values, this.values ?? {});
                this.schemes = Object.assign(schemes ?? {}, this.schemes ?? {});
                this.valueOf = valueOf ??  this.valueOf;
            });
        };
    }

    /**
     * parse and validate request body data
     *
     * @param values - Data subject to validation
     * @returns ParserSchemesResponse
     */
    parserSchemes(values?: SW.valuesArgs): Promise<SW.ParserSchemesResponse>
    {
        return parserSchemes(
            this.valueOf, this.schemes, this.values ?? values
        )
    }

    reset() {
        this.valueOf = true;
        this.schemes = {};
        this.values = undefined;
    }
}

export default Validators;

const validator = new Validators();

const addSchemes = (schemes: SW.scheme) => {
    validator.schemes = Object.assign(validator.schemes, schemes);
}

/**
 *
 * @param callBack -
 */
const handlerAddScheme = (callBack: SW.FuncResolvePromiseScheme) => {
    new Promise((resolve) => {
        callBack(resolve);
    }).then((schemes: SW.schemes) => {
        addSchemes(schemes);
    });
}

/**
 *
 * @param schemesEntries -
 */
const addPropertySchemesValidator = <T>(schemesEntries: [keyof T, T[keyof T]][]): Promise<void> => {
    return new Promise((resolve) => {
        resolve(Object.fromEntries(schemesEntries));
    }).then((schemeData) => {
        validator.schemes = Object.assign(validator.schemes, schemeData);
    })
}

export class ParserSchemes implements SW.ParserSchemesClass{

    /**
     *
     */
    constructor() {
        validator.reset();
    }

    /**
     *
     */
    parserSchemes() {
        return addPropertySchemesValidator(Object.entries(this))
            .then(()=> validator.updateProperty((update) => {
                const request = requestGet();
                update({values: {...request.body, ...request.params, ...request.query }});
            })).then(() => validator.parserSchemes());
    }

    /**
     *
     * @param schemes -
     */
    addSchemes(schemes: SW.schemes) {
        addSchemes(schemes);
    }

    /**
     * The addScheme property must be represented in the child class as a function
     * within this function the schemas are loaded for the validation of the arguments
     *
     * @example
     *```ts
     * addScheme({type: Sandwich.String, required: true, strict: true}, ['email'])
     *```
     * @param scheme -
     * @param arg -
     */
    addScheme(scheme: SW.scheme, arg: string | string[]) {
        handlerAddScheme((add: SW.resolvePromiseScheme): void => {
            if(typeof arg == 'string') {
                add({
                    [arg]: scheme
                });
            } else {
                let sh = {}
                for (let i = 1; i <= arg.length; i++) {
                    sh = {
                        [arg[i -1]]: scheme,
                        ...sh
                    }
                    if(i == arg.length) add(sh);
                }
            }
        });
    }
}
