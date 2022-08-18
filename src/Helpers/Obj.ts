export class Obj {

    public static enumToObj(targetEnum: any):any {
        let toObject:any = {};
        for (let key of targetEnum) {
            toObject[key] = targetEnum[key];
        }
        return toObject;
    }

}