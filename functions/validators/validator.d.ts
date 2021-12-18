import {FunctionVoid, validationFun} from "../utils/typeUtil";

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
    validation?: validationFun,
}

/**
 * schemes
 */
export type schemes = {[index: string]: scheme} | null;

/**
 *
 */
export type ParserSchemesResponse = {
    schemes: any,
    args: {[index: string | number]},
    errors: any[],
    message: string,
}

export type ParserSchemeFunction = Promise<ParserSchemesResponse>;

/**
 *
 */
type valuesArgs = {[index: string | number]} | undefined;

/**
 *
 */
type valueOf = boolean;

export interface ParserSchemesClass {
    parserSchemes(values?: valuesArgs): ParserSchemeFunction;
    /**
     *
     * @param schemes -
     * @param args -
     */
    addSchemes(schemes: schemes, args: string | string[]): void;
    /**
     *
     * @param schemes -
     * @param args -
     */
    addScheme(schemes: scheme, args: string | string[]): void;
}

/**
 *
 */
export type HandlerParserSchemes = (
    valueOf?: valueOf,
    schemes?: schemes,
    values?: valuesArgs
) => ParserSchemeFunction;

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
 * class Sandwiches
 *
 */
export interface ValidatorsClass extends TypeValid {
    readonly schemes: schemes;
    /**
     *
     */
    valueOf: boolean;
    /**
     *
     */
    values: valuesArgs;
    /**
     *
     * @param body -
     * @returns ParserSchemeFunction
     */
    parserSchemes(body?: valuesArgs): ParserSchemeFunction;
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
