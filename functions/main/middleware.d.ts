import {routerProps, middlewares, schemes, ReqType, ResType, Next} from "../type";
import {Types} from "../validators/types";

/**
 *
 * @param options -
 * @return `Promise<{
  f: () => void,
  success: boolean,
  method: string,
  schemes: unknown,
  req_body: string | null | undefined,
}>`
 */
export type HandlerExec = (options: routerProps) => Promise<{
    f: () => void,
    success: boolean,
    method: string,
    req_body: string | null | undefined,
}>

/**
 *
 * @param options -
 */
export type HandlerTransform = (options: routerProps) => Promise<any>;


type valuesArgs = {[index: string | number]};
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
) => Promise<ParserSchemesResponse>

/**
 *
 */
export interface Resource {
    readonly schemes: schemes;
    train: unknown;
    request: any;
    addArgs: any;
}

/**
 * Constructor of the Resource class
 */
export interface HandlerResource {
    new (req: any, res: any): Resource,
}

/**
 *
 *
 * @param classRequest -
 * @param middlewares -
 * @return `{(
 *       req: ReqType, res: ResType, next?: Next
 *     ) => unknown}`
 */
type Handler = (classRequest: any, middlewares?: middlewares) => (
    req: ReqType, res: ResType, next?: Next
) => unknown;
/**
 *
 *
 * @param schemes -
 * @return
 */
type ResourceClass = (schemes?: schemes) => HandlerResource
/**
 * class Sandwiches
 *
 */
export interface ValidatorsClass extends Types {
    readonly schemes: schemes;
    valueOf: boolean;
    /**
     *
     * @param body -
     * @return Promise<ParserSchemesResponse>
     */
    parserSchemes(body: valuesArgs): Promise<ParserSchemesResponse>
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
