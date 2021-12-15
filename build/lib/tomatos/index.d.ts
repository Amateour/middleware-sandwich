import { TomatoesProperty } from '../../../functions';
declare const tomato: {
    (peel: any): TomatoesProperty;
    filter(value: any, callback: any): any;
    map(value: any, callback: any): any;
    get(value: any, key: string | number, notInherited?: boolean | undefined): any;
    hasOwn(value: any, key: string, notInherited?: boolean | undefined): any;
    omit(value: any, arrayKeys: string[]): any;
    find(value: any, callback: any): any;
};
export default tomato;
