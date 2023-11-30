import * as Nunjucks from "nunjucks";
import {api} from "@src/server";

class BaseTemplate {

    public system:Nunjucks.Environment;
    public content:any;
    public basePath:string;
    public includePath:string;
    public contentPath:string;
    public name:string;
//{path: path.join(__dirname, "../.env")}
    constructor(name:string="default", basePath:string="") {
        this.name = name + ".njk";
        this.basePath = api.templateBasePath;//absolute in server path.
        this.includePath = `${this.basePath}`;//kept this as the base (before the Emails templates, to be able to navigate more easily.
        this.contentPath = `${this.basePath}${basePath}`;

        this.system = api.templateSystem;
    }

    /**
     * Render the target layout from Content
     * and context are prepared in EmailNotification contructor.
     * @param content {object}
     */
    public async render(content:any){
        this.content = content;
        return Nunjucks.render(`${this.contentPath}/${this.name}`, this.content.context);
    }

    public async preview(content:any):Promise<string> {
        return await this.render(content);
    }
}

export default BaseTemplate;