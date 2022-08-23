export class Obj {

    public static enumToObj(targetEnum: any):any {
        let toObject:any = {};
        for (let key of targetEnum) {
            toObject[key] = targetEnum[key];
        }
        return toObject;
    }

    public static isNull(element:any):Boolean {
        return element === null;
    }

    public static isNotNull(element:any):Boolean {
        return element !== null;
    }

    public static isUndefined(element:any):Boolean {
        return element === undefined;
    }

    public static isNotUndefined(element:any):Boolean {
        return element !== undefined;
    }

    public static isEmpty(element:any):Boolean {
        return element === [] || element === {};
    }

    public static isNotEmpty(element:any):Boolean {
        if (Array.isArray(element)) {
            return element.length >= 1;
        }
        if (typeof element === 'object' && !Array.isArray(element)) {
            return element !== {};
        }
        return false;
    }

}