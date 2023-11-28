import BaseTemplate from "@src/Templates/BaseTemplate";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import config from "@src/config";

class EmailTemplate extends BaseTemplate {

    constructor(name:string="default") {
        super(name, "/Emails/Layouts")
        this.name = name + ".njk";

        LogHelper.info("Initiating templates for emails", `on path : ${this.basePath}`, `app base path ${config.basepath}`, `content : ${this.contentPath}`, `includes : ${this.includePath}`);
    }

}

export default EmailTemplate;