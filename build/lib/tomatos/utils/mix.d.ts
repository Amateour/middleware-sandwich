import { TomatoesProperty } from "../../../../functions";
export declare class Tomatoes implements TomatoesProperty {
    readonly peel: any;
    constructor(peel: any);
    get(key: string, notInherited?: boolean): any;
    hasOwn(key: string, notInherited?: boolean): any;
    size(): any;
    map(callback: any): Tomatoes;
    filter(callback: any): Tomatoes;
    omit(arrayKeys: string[]): Tomatoes;
    find(callback: any): Tomatoes;
}
