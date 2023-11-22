import BaseTemplate from "@src/Templates/BaseTemplate";

class EmailTemplate extends BaseTemplate {

    constructor(name:string="default") {
        super(name, "/Emails/Layouts")
        this.name = name + ".njk";
    }

}

export default EmailTemplate;