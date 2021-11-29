import { TomatosConstructor, TomatosProperty } from '../../functions';

export class Tomatos implements TomatosProperty {
    readonly peel: any;

    constructor(peel: any) {
        this.peel = new Object(peel);
    }
    
    get(elm: string, notInherited?: boolean) {
        if(notInherited) return this.peel[elm];
        if(Object.prototype.hasOwnProperty.call(Object.keys(this.peel), elm)) {
            return this.peel[elm];
        }
    }

    hasOwn(elm: string, notInherited?: boolean) {
        if(notInherited) return !!this.peel[elm];
        return Object.prototype.hasOwnProperty.call(Object.keys(this.peel), elm)
    }

}

const inst = (
    classTomato: TomatosConstructor, peel: any
) => new classTomato(peel)

const tomato = (peel: any): TomatosProperty => inst(Tomatos, peel);

export default tomato;
