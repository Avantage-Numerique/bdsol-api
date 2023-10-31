import BaseTemplate from "@src/Templates/BaseTemplate";

class PublicTemplate extends BaseTemplate {

    constructor(name:string="default", basePath:string="/Layouts") {
        super(name, basePath);
    }

}

export default PublicTemplate;