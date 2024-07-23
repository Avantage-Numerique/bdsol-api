import BaseTemplate from "@src/Templates/BaseTemplate";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import config from "@src/config";

class PublicTemplate extends BaseTemplate {

    constructor(name:string="default", basePath:string="") {
        super(name, basePath);

        LogHelper.info("Initiating templates for public layout", `on path : ${this.basePath}`, `app base path ${config.basepath}`, `content : ${this.contentPath}`, `includes : ${this.includePath}`);
    }

}

export default PublicTemplate;