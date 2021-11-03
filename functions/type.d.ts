
export declare type Any = any;
/**
 * AnyArray
 */
export declare type AnyArray = any[];
/**
 * Next
 */
export declare type Next = any;
/**
 * FunctionVoid 
 */
export declare type FunctionVoid = () => void;
/**
 * methodType
 */
export declare type methodType = Array<string> | string;
/**
 * multiMiddlewareType
 */
export interface multiMiddlewareType {
    middleware: Array<FunctionVoid> | FunctionVoid,
    methods?: Array<string> | string
}
/**
 * middlewaresType
 */
export declare type middlewaresType = FunctionVoid[] | FunctionVoid | multiMiddlewareType | multiMiddlewareType[];
/**
 * middlewareType
 */
export declare type middlewareType = FunctionVoid[] | FunctionVoid;
/**
 * ResType
 */
export declare type ResType = any;
/**
 * ReqType
 */
export declare type ReqType = any;
/**
 * argumentType
 */
export declare type argumentType = object;
/**
 * valueType
 */
export declare type valueType = any;
/**
 * keyType
 */
export declare type keyType = number | string;
/**
 * messageType
 */
export declare type messageType = object | string | null
/**
 * respType
 */
export declare type respType = string;
/**
 * argumentProps
 */
export interface argumentProps {
    argument: any,
    body: any
}
/**
 * routerProps
 */
export interface routerProps {
    method: methodType,
    middleware?: middlewaresType,
    argument: argumentType,
    res: ResType,
    req: ReqType,
}
/**
 * typeProps
 */
export interface typeProps {
    String: string,
    Number: number,
}
/**
 * TypeValid
 */
export interface TypeValid {
    String?: FunctionVoid,
    Number?: FunctionVoid,
    Array?: FunctionVoid,
    Boolean?: FunctionVoid,
    Object?: FunctionVoid,
}
/**
 *  compareType
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
 * schemes
 */
export declare type schemes = bject<compareType>;
/**
 * compareProps
 */
export interface compareProps {
    value: valueType,
    key: keyType,
    message: messageType,
    scheme: schemes,
}
/**
 * argValid
 */
export interface argValid {
    value: any,
    valid_value: any,
    type: valueType,
    key: keyType,
    scheme?: schemes
}
/**
 * argMessProps
 */
export interface argMessProps {
    value?: any,
    valid_value?: any,
    type?: valueType,
    key?: any,
    key_validation?: string | number
}
/**
 * messValid
 */
export declare type messValid = {
    message: string;
    value?: string | number;
}
/**
 * MessageArgument
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
     * message
     */
    export type message = object | string;
    /**
     * errors
     */
    export type errors = any[] | string;
    /**
     * RespAny
     */
    export type RespAny = any;
    /**
     * Data 
     */
    export interface Data {
        message: message,
        errors?: errors
    }
    /**
     * Response errors
     */
    export interface RespError {
        message: message,
        errors?: errors,
        statusCode: number
    }
}
