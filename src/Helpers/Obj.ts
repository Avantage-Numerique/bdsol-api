export class Obj {

    public static enumToObj(targetEnum: any):any {
        let toObject:any = {};
        for (let key of targetEnum) {
            toObject[key] = targetEnum[key];
        }
        return toObject;
    }

    public isNull(element:any):Boolean {
        return element === null;
    }

    public isUndefined(element:any):Boolean {
        return element === undefined;
    }

    public isEmpty(element:any):Boolean {
        return element === "" || element === [] || element === {};
    }

}