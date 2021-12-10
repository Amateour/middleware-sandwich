type admixturesType = {
    map: any,
    size: any,
    filter: any,
    get: any,
    hasOwn: any,
    valueOf: any,
    omit: any,
    find: any
}

export const admixtures: admixturesType = {
    get(key: string, notInherited?: boolean) {
        if(notInherited) return this[key];
        if(Object.prototype.hasOwnProperty.call(Object.keys(this), key)) {
            return this[key];
        }
    },
    hasOwn(key: string, notInherited?: boolean) {
        if(notInherited) return !!this[key];
        return Object.prototype.hasOwnProperty.call(Object.keys(this), key)
    },
    size(): any {
        return Array.isArray(this) ? this.length : Object.keys(this).length;
    },
    map(callback: any): any {
        const length: number = Array.isArray(this) ? this.length : Object.keys(this).length,
            data = new Array(length);

        let index = -1;

        for (const key in this) {
            ++index;
            const element = this[key];
            data[index] = callback(element, key, this);
            if (index === length - 1){
                return data;
            }
        }
    },
    filter(callback: any): any {
        const length: number = Array.isArray(this) ? this.length : Object.keys(this).length,
            data = [];

        let index = -1;

        for (const key in this) {
            ++index;
            const element = this[key];
            if (callback(element, key, this)){
                data.push(element);
            }
            if (index === length - 1){
                return data;
            }
        }
    },
    omit(arrayKeys: string[]): any {
        const length = arrayKeys.length;
        for (let i = 0; i < length; i++) {
            delete this[arrayKeys[i]];
            if(i === length) return this
        }
    },
    find(callback: any): any {
        for (const key in this) {
            const element = this[key];
            if (callback(element, key, this)){
                return this[key];
            }
        }
    }
}