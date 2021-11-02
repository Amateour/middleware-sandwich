export * from './validators/validator';
export * from './utils/help';
export * from './utils/message';
export * from './type';

import {routerProps, middlewaresType, schemes, ReqType, ResType, Next} from "./type";
import {Types} from "./validators/types";

/**
 *
 * @param options
 * @return {Promise<object>}
 */
export type exec = (options: routerProps) => Promise<{
  f: () => void,
  success: boolean,
  method: string,
  schemes: unknown,
  req_body: string | null | undefined,
}>

/**
 *
 * @param options
 */
export type transform = (options: routerProps) => Promise<any>;

/**
 * 
 */
export type ParserSchemesResponse = {
  schemes: any,
  args: any,
  errors: any[],
  message: string,
}

/**
 * 
 */
export type parserSchemes = (
  value_of?: boolean | true | any, scheme?: Scheme | null, req_body?: any, request?: boolean
  ) => Promise<ParserSchemesResponse>

/**
 * 
 */
 export interface Resource {
  readonly schemes: schemes;
  readonly parser_schemes: parserSchemes;
  f: any;
  request: any;
}

/**
 * class Sandwiches
 *
 * @class {Sandwiches}
 */
export interface Sandwiches extends Types {
    schemes: schemes;
    value_of: boolean;
    /**
     *
     *
     * @param {*} body
     * @return {*}  {Promise<ParserSchemesResponse>}
     * @memberof Sandwiches
     */
    parser_schemes(body: any): Promise<ParserSchemesResponse>
    /**
     *
     *
     * @param {routerProps} options
     * @return {*}  {Promise<transform>}
     * @memberof Sandwiches
     */
    _(options: routerProps): Promise<transform>
    /**
     *
     *
     * @param {*} classRequest
     * @param {middlewaresType} [middlewares]
     * @return {*}  {(
     *       req: ReqType, res: ResType, next?: Next
     *     ) => unknown}
     * @memberof Sandwiches
     */
    handler(classRequest: any, middlewares?: middlewaresType): (
      req: ReqType, res: ResType, next?: Next
    ) => unknown
    /**
     *
     *
     * @param {schemes} [schemes]
     * @return {*}  {*}
     * @memberof Sandwiches
     */
    resource(schemes?: schemes): any
}

export declare type Sandwich = Sandwiches 
