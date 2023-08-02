import licencesCollection from "./licencesCollection";

class LicencesData {

    public static rawData:any;

    public static raw():any {
        if (LicencesData.rawData === undefined) {
            LicencesData.rawData = licencesCollection;
        }
        return LicencesData.rawData;
    }
}

export default LicencesData;