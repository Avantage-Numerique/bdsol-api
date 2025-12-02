import BaseTemplate from "@src/Templates/BaseTemplate";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import config from "@src/config";

class EmailTemplate extends BaseTemplate {
    constructor(name: string = "default") {
        super(name, "/Emails");
        this.name = name + ".njk";
    }
}

export default EmailTemplate;
