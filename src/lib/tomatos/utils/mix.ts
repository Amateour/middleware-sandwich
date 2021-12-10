import {TomatoesProperty} from "../../../../functions";
import {admixtures} from "./admixtures";

export class Tomatoes implements TomatoesProperty {
    readonly peel: any;

    constructor(peel: any) {
        this.peel = new Object(peel);
    }

    get(key: string, notInherited?: boolean) {
        return admixtures.get.call(this.peel, key, notInherited);
    }

    hasOwn(key: string, notInherited?: boolean) {
        return admixtures.hasOwn.call(this.peel, key, notInherited);
    }

    size(): any {
        return admixtures.size.call(this.peel);
    }

    map(callback: any) {
        return new Tomatoes(admixtures.map.call(this.peel, callback));
    }

    filter(callback: any) {
        return new Tomatoes(admixtures.filter.call(this.peel, callback));
    }

    omit(arrayKeys: string[]) {
        return new Tomatoes(admixtures.omit.call(this.peel, arrayKeys));
    }

    find(callback: any) {
        return new Tomatoes(admixtures.filter.call(this.peel, callback));
    }
}