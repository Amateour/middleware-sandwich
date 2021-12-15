
type callbackMap = (value: any, index: string | number, data: any) => any
type admixturesType = {
    map: any,
    size: any,
    filter: (callback: callbackMap) => Promise<any[]>,
    get: any,
    has: any,
    valueOf: any,
    omit: any,
    find: any,
    flatten: (level: number) => Promise<any[]>
}

export const admixtures: admixturesType = {
    get(key: string, notInherited?: boolean) {
        if(notInherited) return this[key];
        if(Object.prototype.hasOwnProperty.call(this, key)) {
            return this[key];
        }
    },
    has(key: string, notInherited?: boolean) {
        if(notInherited) return !!this[key];
        return Object.prototype.hasOwnProperty.call(this, key);
    },
    size(): any {
        return Array.isArray(this) ? this.length : Object.keys(this).length;
    },
    map(callback: any): any {
        return new Promise((resolve) => {
            const length: number = Array.isArray(this) ? this.length : Object.keys(this).length,
                data = new Array(length);

            let index = -1;

            for (const key in this) {
                ++index;
                const element = this[key];
                data[index] = callback(element, key, this);
                if (index === length - 1){
                    resolve(data);
                }
            }
        })
    },
    filter(callback: any): any {
        return new Promise((resolve) => {
            const length: number = Array.isArray(this) ?
                    this.length : Object.keys(this).length,
                data = [];
            let index = -1;

            for (const key in this) {
                ++index;
                const element = this[key];
                if (callback(element, key, this)){
                    data.push(element);
                }
                if (index === length - 1){
                    resolve(data);
                }
            }
        })
    },
    omit(arrayKeys: string[]): any {
        return new Promise((resolve) => {
            const length = arrayKeys.length;
            for (let i = 0; i < length; i++) {
                delete this[arrayKeys[i]];
                if(i === length) resolve(this);
            }
        })
    },
    find(callback: any): Promise<any> {
        return new Promise((resolve) => {
            for (const key in this) {
                const element = this[key];
                if (callback(element, key, this)){
                    resolve(this[key]);
                }
            }
        })
    },
    flatten(level = 1) {
        let levelCount = 1;
        async function flattenDeep(arr1: any) {
            return arr1.reduce((acc: any, val: any) => Array.isArray(val) && ++levelCount <=  level?
                acc.concat(flattenDeep(val)) : acc.concat(val), []);
        }
        return new Promise((resolve) => {
            resolve(flattenDeep(this));
        });
    }
}

export const filter = (value: any, callback: callbackMap) =>  {
    return admixtures.filter.call(value, callback);
};

export const map = (value: any, callback: any) =>  {
    return admixtures.map.call(value, callback);
};

export const flatten = (value: any, level = 1) =>  {
    return admixtures.flatten.call(value, level);
};

export const get = (value: any, key: string | number,  notInherited?: boolean) =>  {
    return admixtures.get.call(value , key, notInherited);
};

export const has = (value: any, key: string,  notInherited?: boolean) =>  {
    return admixtures.has.call(value , key, notInherited);
};

export const omit = (value: any, arrayKeys: string[]) =>  {
    return admixtures.omit.call(value , arrayKeys);
};

export const find = (value: any, callback: any) =>  {
    return admixtures.find.call(value, callback);
};
