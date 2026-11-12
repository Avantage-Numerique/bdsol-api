import BaseTemplate from "@src/Templates/BaseTemplate";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import config from "@src/config";

class PublicTemplate extends BaseTemplate {
    constructor(name: string = "default", basePath: string = "") {
        super(name, basePath);
    }
}

export default PublicTemplate;
