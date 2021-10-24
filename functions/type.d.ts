
export type Any = any;
export type AnyArray = any[];
export declare type methodType = Array<String> | String;
export interface multiMiddlewareType {
    middleware: Array<Function> | Function,
    methods?: Array<string> | string
}
export declare type middlewaresType = Function[] | Function | multiMiddlewareType | multiMiddlewareType[];
export declare type middlewareType = Function[] | Function;
export declare type resType = any;
export declare type reqType = any;
export declare type argumentType = object;
export declare type valueType = any;
export declare type keyType = number | string;
export declare type messageType = object | string | null
export declare type respType = string;

export interface argumentProps {
    argument: any,
    body: any
}

export interface routerProps {
    method: methodType,
    middleware?: middlewaresType,
    argument: argumentType,
    res: resType,
    req: reqType,
}

export interface typeProps {
    String: String,
    Number: Number,
}

export interface TypeValid {
    String?: Function,
    Number?: Function,
    Array?: Function,
    Boolean?: Function,
    Object?: Function,
}

export interface compareType {
    type?: Function | string,
    required?: boolean,
    min?: number,
    max?: number,
    value?: any,
    validation?: Function
    // validation?: Function | Function<object>
}

export type Scheme = bject<compareType>;

export interface compareProps {
    value: valueType,
    key: keyType,
    message: messageType,
    scheme: Scheme,
}

export interface argValid {
    value: any,
    valid_value: any,
    type: valueType,
    key: keyType,
    scheme?: Scheme
}

export interface argMessProps {
    value?: any,
    valid_value?: any,
    type?: valueType,
    key?: any,
    key_validation?: string | number
}

export declare type messValid = {
    message: string;
    value?: string | number;
}

interface MessageArgument {
    required: () => messValid | respType,
    min: (props: argMessProps) => messValid | respType,
    max: (props: argMessProps) => messValid | respType,
    strict: (props: argMessProps) => messValid | respType,
    validation: (props: argMessProps) => messValid | respType,
}

export declare module ErrorsRequest {
    type message = object | string;
    type errors= Array<any> | string;
    type RespAny = any;

    interface Data {
        message: message,
        errors?: errors
    }

    interface RespError {
        message: message,
        errors?: errors,
        statusCode: number
    }
}
