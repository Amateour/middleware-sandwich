declare type LodashFunction = (valid_value?: any, key?: any) => any;
interface LodashUtils {
    get(value?: any, key?: any): any;
    map(fun: LodashFunction): LodashUtils;
    filter(fun: LodashFunction): LodashUtils;
    valueOf: any;
    find(value?: any, func?: LodashFunction): any;
    omit(value?: any, key?: any): any;
    assign(obj: any, obj_uni: any): any;
    all: (value: any) => LodashUtils;
}
declare type FunctionAll = (value: any) => LodashUtils;
export declare const lodashAll: FunctionAll;
declare const _default: {
    all: FunctionAll;
    get(value?: any, key?: any): any;
    map(fun: LodashFunction): LodashUtils;
    filter(fun: LodashFunction): LodashUtils;
    valueOf: any;
    find(value?: any, func?: LodashFunction | undefined): any;
    omit(value?: any, key?: any): any;
    assign(obj: any, obj_uni: any): any;
};
export default _default;
