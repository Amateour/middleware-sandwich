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
    value_of?: boolean | true | undefined,
    schemes?: schemes | null,
    reqBody?: {[index: string | number]},
    respActive?: boolean
) => Promise<ParserSchemesResponse>

/**
 *
 */
export interface Resource {
    readonly schemes: schemes;
    readonly parser_schemes: HandlerParserSchemes;
    train: unknown;
    request: any;
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
export interface Sandwiches extends Types {
    schemes: schemes;
    value_of: boolean;
    /**
     *
     *
     * @param body -
     * @return Promise<ParserSchemesResponse>
     */
    parser_schemes(body: any): Promise<ParserSchemesResponse>
    /**
     *
     *
     * @param options -
     * @return Promise<transform>
     */
    _(options: routerProps): Promise<transform>
}
/**
 *
 */
export interface SandwichClass extends Sandwiches {
    /**
     *
     */
    handler: Handler,
}
