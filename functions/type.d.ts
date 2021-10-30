/**
 * @type Any
 */
export declare type Any = any;
/**
 * @type AnyArray
 */
export declare type AnyArray = any[];
/**
 * @type Next
 */
export declare type Next = any;
/**
 * @type FunctionVoid 
 */
export declare type FunctionVoid = () => void;
/**
 * @type methodType
 */
export declare type methodType = Array<string> | string;
/**
 * @interface multiMiddlewareType
 */
export interface multiMiddlewareType {
    middleware: Array<FunctionVoid> | FunctionVoid,
    methods?: Array<string> | string
}
/**
 * @type middlewaresType
 */
export declare type middlewaresType = FunctionVoid[] | FunctionVoid | multiMiddlewareType | multiMiddlewareType[];
/**
 * @type middlewareType
 */
export declare type middlewareType = FunctionVoid[] | FunctionVoid;
/**
 * @type ResType
 */
export declare type ResType = any;
/**
 * @type ReqType
 */
export declare type ReqType = any;
/**
 * @type argumentType
 */
export declare type argumentType = object;
/**
 * @type valueType
 */
export declare type valueType = any;
/**
 * @type keyType
 */
export declare type keyType = number | string;
/**
 * @type messageType
 */
export declare type messageType = object | string | null
/**
 * @type respType
 */
export declare type respType = string;
/**
 * @interface argumentProps
 */
export interface argumentProps {
    argument: any,
    body: any
}
/**
 * @interface routerProps
 */
export interface routerProps {
    method: methodType,
    middleware?: middlewaresType,
    argument: argumentType,
    res: ResType,
    req: ReqType,
}
/**
 * @interface typeProps
 */
export interface typeProps {
    String: string,
    Number: number,
}
/**
 * @interface TypeValid
 */
export interface TypeValid {
    String?: FunctionVoid,
    Number?: FunctionVoid,
    Array?: FunctionVoid,
    Boolean?: FunctionVoid,
    Object?: FunctionVoid,
}
/**
 * @interface  compareType
 */
export interface compareType {
    type?: FunctionVoid | string,
    required?: boolean,
    min?: number,
    max?: number,
    value?: any,
    strict?: boolean,
    validation?: FunctionVoid
}
/**
 * @type Scheme
 */
export declare type Scheme = bject<compareType>;
/**
 * @interface compareProps
 */
export interface compareProps {
    value: valueType,
    key: keyType,
    message: messageType,
    scheme: Scheme,
}
/**
 * @interface argValid
 */
export interface argValid {
    value: any,
    valid_value: any,
    type: valueType,
    key: keyType,
    scheme?: Scheme
}
/**
 * @interface argMessProps
 */
export interface argMessProps {
    value?: any,
    valid_value?: any,
    type?: valueType,
    key?: any,
    key_validation?: string | number
}
/**
 * @type messValid
 */
export declare type messValid = {
    message: string;
    value?: string | number;
}
/**
 * @interface MessageArgument
 */
export interface MessageArgument {
    required: () => messValid | respType,
    min: (props: argMessProps) => messValid | respType,
    max: (props: argMessProps) => messValid | respType,
    strict: (props: argMessProps) => messValid | respType,
    validation: (props: argMessProps) => messValid | respType,
}
/**
 * 
 */
export declare namespace ErrorsRequest {
    /**
     * @type message
     */
    export type message = object | string;
    /**
     * @type errors
     */
    export type errors = any[] | string;
    /**
     * @type RespAny
     */
    export type RespAny = any;
    /**
     * @interface Data 
     */
    export interface Data {
        message: message,
        errors?: errors
    }
    /**
     * @interface Response errors
     */
    export interface RespError {
        message: message,
        errors?: errors,
        statusCode: number
    }
}
