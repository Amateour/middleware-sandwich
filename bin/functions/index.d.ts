export * from './validators/validator';
export * from './utils/help';
export * from './utils/message';
export * from './type';

import {routerProps, middlewaresType, compareType} from "./type";
import {Types} from "./validators/types";

/**
 *
 * @param options
 * @return {Promise<object>}
 */
export type exec = (options: routerProps) => Promise<{
  f: Function,
  success: boolean,
  method: string,
  schemes: any,
  req_body: any,
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
  errors: any
}

export type parser_schemes = (value_of: boolean, scheme: compareType | null, req_body?: any,) => Promise<ParserSchemesResponse>

/**
 * 
 */
 export interface add_arguments {
  readonly arg: any;
  readonly parser_schemes: parser_schemes;
  f: any;
  request: any;
}

/**
 * class Sandwiches
 *
 * @class {Sandwiches}
 */
export interface Sandwiches extends Types {
    scheme: compareType | null | any;
    value_of: boolean;

    parser_schemes(body: any): Promise<ParserSchemesResponse>

    /**
     *
     * @param options
     */
    _(options: routerProps): Promise<transform>

    /**
     *
     * @param classRequest
     * @param middlewares
     */
    handler(classRequest: any, middlewares?: middlewaresType): unknown
    /**
     *
     * @param scheme
     */
    Req(scheme?: compareType): any
}

export declare type Sandwich = Sandwiches 
