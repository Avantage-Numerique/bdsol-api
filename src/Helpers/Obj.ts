

export class Obj {

    public static enumToObj(targetEnum: any):any {
        const toObject:any = {};
        for (const key of targetEnum) {
            toObject[key] = targetEnum[key];
        }
        return toObject;
    }

    public static enumHave(targetEnum:any, property:string):boolean {
        return Object.values(targetEnum).includes(property);
    }


    public static isNull(element:any):boolean {
        return element === null;
    }


    public static isNotNull(element:any):boolean {
        return element !== null;
    }


    public static isUndefined(element:any):boolean {
        return typeof element === "undefined";
    }


    public static isNotUndefined(element:any):boolean {
        return typeof element !== "undefined";
    }


    public static isEmpty(element:any):boolean {
        return Object.keys(element).length === 0 || element.length === 0;
    }


    public static isNotEmpty(element:any):boolean {
        if (Array.isArray(element)) {
            return element.length >= 1;
        }
        if (typeof element === 'object' && !Array.isArray(element)) {
            return Object.keys(element).length !== 0;
        }
        return false;
    }


    public static propertyToString(obj:any, propertyValue:any):string {

        for (const property in obj) {
            const prop = obj[property];
            if (propertyValue === prop) return property;
        }
        return "";
    }

    public static pluck(obj:Array<any|object>, property:string):Array<any> {
        const pluckedValues:Array<any> = [];
        for (const element of obj) {
            pluckedValues.push(element[property]);
        }
        return pluckedValues;
    }

}