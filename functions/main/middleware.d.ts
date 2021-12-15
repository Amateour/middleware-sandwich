import {middlewares, schemes, ReqType, ResType, Next, TypeValid} from "../utils/typeUtil";

/**
 *
 */
export interface Resource {
    train: unknown;
    request: any;
}

/**
 * Constructor of the Resource class
 */
export interface HandlerResource {
    new (): Resource,
}

type valuesArgs = {[index: string | number]} | undefined;
type valueOf = boolean;

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
export type HandlerParserSchemes = (
    valueOf?: valueOf,
    schemes?: schemes,
    values?: valuesArgs
) => ParserSchemeFunction;

type HandlerResponse = (
    req: ReqType, res: ResType, next?: Next
) => unknown;
/**
 *
 *
 * @param classRequest -
 * @param middlewares -
 * @returns HandlerResponse
 */
type Handler = (classRequest: any, middlewares?: middlewares) => HandlerResponse;

/**
 * ValidatorCallback
 */
export type ValidatorCallback = (resolve: any) => void ;

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

export interface ParserSchemesClass {
    /**
     *
     * @param schemes -
     * @param args -
     */
    addScheme(schemes: schemes, args: string | string[]): void;
}

/**
 *
 */
export interface SandwichClass extends ValidatorsClass {
    /**
     *
     */
    handler: Handler,
}