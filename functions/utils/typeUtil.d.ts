import {ErrorStatus} from '../validators';

export type Any = any;

/**
 * Next
 */
export type Next = any;
/**
 * FunctionVoid 
 */
export type FunctionVoid = (props: any) => void;
/**
 * methodType
 */
export type methodType = string;
/**
 * multiMiddlewareType
 */
export interface multiMiddlewareType {
    middleware: FunctionVoid[] | FunctionVoid,
    methods?: string[] | string
}

/**
 *
 */
type FuncMiddlewares = FunctionVoid[] | FunctionVoid;

/**
 *
 */
type FuncMultiMiddlewares = multiMiddlewareType | multiMiddlewareType[];

/**
 * middlewaresType
 */
export type middlewares = FuncMiddlewares | FuncMultiMiddlewares;
/**
 * middlewareType
 */
export type middlewareType = FunctionVoid[] | FunctionVoid;
/**
 * ResType
 */
export type ResType = any;
/**
 * ReqType
 */
export type ReqType = any;
/**
 * valueType
 */
export type valueType = any;
/**
 * keyType
 */
export type keyType = number | string;
/**
 * messageType
 */
export type messageType = object | string | null
/**
 * respType
 */
export type respType = string;
/**
 * argumentProps
 */
export interface argumentProps {
    argument: any,
    body: any,
    errors: ErrorStatus[]
}

/**
 * typeProps
 */
export interface typeProps {
    String: string,
    Number: number,
}


export type validationFun = (value: any) => any;

/**
 * compareProps
 */
export interface compareProps {
    value: valueType, // value to be validated example "Brayan Salgado"
    key: keyType, // key main
    message: messageType,
    scheme: scheme, // data validation schema
}

/**
 * argValid
 */
export interface argValid {
    value: any,
    validValue: any,
    type: valueType,
    key: keyType,
    scheme?: schemes
}
/**
 * argMessProps
 */
export interface argMessProps {
    value?: any,
    validValue?: any,
    type?: valueType,
    key?: any,
    key_validation?: string | number
}
/**
 * messValid
 */
export type messValid = {
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

