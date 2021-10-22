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
export type transform = (options: routerProps) => Promise<any>

export type parser_schemes = (value_of: boolean, req_body: object, scheme: compareType) => Promise<{
  schemes: any,
  args: any,
  errors: any
}>

/**
 * 
 */
 export interface add_arguments {
  readonly arg: any;
  readonly parser_schemes: Function;
  f: any;
  request: any;
}

/**
 * class Sandwiches
 *
 * @class {Sandwiches}
 */
export interface Sandwiches extends Types {

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
