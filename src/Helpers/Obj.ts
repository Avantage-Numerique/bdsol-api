

export class Obj {

    public static enumToObj(targetEnum: any):any {
        let toObject:any = {};
        for (let key of targetEnum) {
            toObject[key] = targetEnum[key];
        }
        return toObject;
    }

    public static enumHave(targetEnum:any, property:string):boolean {
        return Object.values(targetEnum).includes(property);
    }


    public static isNull(element:any):Boolean {
        return element === null;
    }


    public static isNotNull(element:any):Boolean {
        return element !== null;
    }


    public static isUndefined(element:any):Boolean {
        return typeof element === "undefined";
    }


    public static isNotUndefined(element:any):Boolean {
        return typeof element !== "undefined";
    }


    public static isEmpty(element:any):Boolean {
        return Object.keys(element).length === 0 || element.length === 0;
    }


    public static isNotEmpty(element:any):Boolean {
        if (Array.isArray(element)) {
            return element.length >= 1;
        }
        if (typeof element === 'object' && !Array.isArray(element)) {
            return Object.keys(element).length !== 0;
        }
        return false;
    }


    public static propertyToString(obj:any, propertyValue:any):string {

        for (let property in obj) {
            let prop = obj[property];
            if (propertyValue === prop) return property;
        }
        return "";
    }

    public static pluck(obj:Array<any|object>, property:string):Array<any> {
        let pluckedValues:Array<any> = [];
        for (let element of obj) {
            pluckedValues.push(element[property]);
        }
        return pluckedValues;
    }

}