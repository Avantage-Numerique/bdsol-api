
export class Licences {

    public static rawData:any;

    public static raw():any {
        if (Licences.rawData === undefined) {
            const rawLicences:any = require(`./licences.json`);
            Licences.rawData = rawLicences.licences;
        }
        return Licences.rawData;
    }
}