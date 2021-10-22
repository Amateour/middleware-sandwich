const _ = require('lodash');

type LodashFunction = (valid_value?: any, key?: any) => any;

interface LodashUtils {
  get(value?: any, key?: any): any,
  map(fun: LodashFunction): LodashUtils,
  filter(fun: LodashFunction): LodashUtils,
  valueOf: any,
  find(value?: any, func?: LodashFunction): any,
  omit(value?: any, key?: any): any,
  assign(obj: any, obj_uni: any): any
  all: (value: any) => LodashUtils
}

type FunctionAll = (value: any) => LodashUtils;
type FunctionInit = LodashUtils

const lodash: FunctionInit = _;

export const lodashAll: FunctionAll = _;

export default  {
  ...lodash,
  all: lodashAll
};
