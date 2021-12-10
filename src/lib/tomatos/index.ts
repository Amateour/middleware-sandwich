import { TomatoesConstructor, TomatoesProperty } from '../../../functions';
import {admixtures} from './utils/admixtures'
import {Tomatoes} from './utils/mix'

const inst = (
    classTomato: TomatoesConstructor, peel: any
) => new classTomato(peel)

const tomato = function (peel: any): TomatoesProperty {
    return inst(Tomatoes, peel);
};

tomato.filter = (value: any, callback: any) =>  {
    return admixtures.filter.call(value, callback);
};

tomato.map = (value: any, callback: any) =>  {
    return admixtures.map.call(value, callback);
};

tomato.get = (value: any, key: string | number,  notInherited?: boolean) =>  {
    return admixtures.get.call(value , key, notInherited);
};

tomato.hasOwn = (value: any, key: string,  notInherited?: boolean) =>  {
    return admixtures.hasOwn.call(value , key, notInherited);
};

tomato.omit = (value: any, arrayKeys: string[]) =>  {
    return admixtures.omit.call(value , arrayKeys);
};

tomato.find = (value: any, callback: any) =>  {
    return admixtures.find.call(value, callback);
};

tomato.prototype.constructor = Tomatoes;

export default tomato;
