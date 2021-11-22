import {routerProps, middlewares, schemes, ReqType, ResType, Next} from "../type";
import {Types} from "../validators/types";

type HandleExecResponse = {
    train: () => void,
    success: boolean,
    method: string,
    req_body: string | null | undefined,
}

/**
 *
 * @param options -
 * @returns Promise<HandleExecResponse>
 */
export type HandlerExec = (options: routerProps) => Promise<HandleExecResponse>

/**
 *
 * @param options -
 */
export type HandlerTransform = (options: routerProps) => Promise<any>;


type valuesArgs = {[index: string | number]} | undefined;
type valueOf = boolean | true;

/**
 *
 */
export type ParserSchemesResponse = {
    schemes: any,
    args: {[index: string | number]},
    errors: any[],
    message: string,
}

/**
 *
 */
export type HandlerParserSchemes = (
    valueOf?: valueOf,
    schemes?: schemes | null,
    values?: valuesArgs
) => Promise<ParserSchemesResponse>;

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
 *
 *
 * @param schemes -
 * @returns
 */
type ResourceClass = (schemes?: schemes) => HandlerResource;
export type ValidatorCallback = (resolve: any) => void ;
/**
 * class Sandwiches
 *
 */
export interface ValidatorsClass extends Types {
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
     * @returns Promise<ParserSchemesResponse>
     */
    parserSchemes(body?: valuesArgs): Promise<ParserSchemesResponse>;
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