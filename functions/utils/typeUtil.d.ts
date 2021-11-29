export type Any = any;

/**
 * Next
 */
export type Next = any;
/**
 * FunctionVoid 
 */
export type FunctionVoid = () => void;
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
export type resolvePromiseScheme = (scheme: scheme) => void;
/**
 *
 */
export type FuncResolvePromiseScheme = (
    resolve: resolvePromiseScheme
) => void;
/**
 * middlewaresType
 */
export type middlewares = FunctionVoid[] | FunctionVoid | multiMiddlewareType | multiMiddlewareType[];
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
 * argumentType
 */
export type argumentType = object;
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
    body: any
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

export type validationFun = (value: any) => any;

/**
 *  scheme validation
 */
export interface scheme {
    type?: FunctionVoid | string ,
    required?: boolean,
    min?: number,
    max?: number,
    value?: any,
    strict?: boolean,
    validation?: validationFun
}
/**
 * schemes
 */
export type schemes = {[index: string]: scheme};
/**
 * compareProps
 */
export interface compareProps {
    value: valueType,
    key: keyType,
    message: messageType,
    scheme: scheme,
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

