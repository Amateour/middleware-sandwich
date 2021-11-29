import { TomatosProperty } from '../../functions';
export declare class Tomatos implements TomatosProperty {
    readonly peel: any;
    constructor(peel: any);
    get(elm: string, notInherited?: boolean): any;
    hasOwn(elm: string, notInherited?: boolean): boolean;
}
declare const tomato: (peel: any) => TomatosProperty;
export default tomato;
