import listEndpoints from "express-list-endpoints";
import {api} from "@src/server";

class AdminController {

    /** @private @static Singleton instance */
    private static _instance: AdminController;
    name: string = "AdminController";

    constructor() {
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {AdminController} Controller singleton constructor
     */
    public static getInstance(): AdminController {
        if (AdminController._instance === undefined) {
            AdminController._instance = new AdminController();
        }
        return AdminController._instance;
    }


    public async renderAdminDashboard() {
        let content:string = "<a href='https://51.222.24.157:9443/api/stacks/webhooks/3eaba35f-3914-4a8e-98e5-ff85ceb54663' title=''>Repartir le stack avec un webhook 8-)</a>";
        return `<html lang="en"><head><title>BDSOL API</title></head><body>${content}</body></html>`;
    }

    public async renderRoutesStructure(){
        const routeStructure:any = listEndpoints(api.express);
        let routesRender:string = "<html lang='fr'><body><ul style='display: flex; flex-direction: row; justify-content: start; align-items: start; flex-wrap: wrap;padding: 0; list-style: none; margin: 0;'>";

        const rowPrefix:string = "<li style='padding: 1rem; margin:2rem;'>";
        const rowSuffix:string = "</li>";

        const pathPrefix:string = "<h3>";
        const pathSuffix:string = "</h3>";

        const prefix:string = "<ul>";
        const suffix:string = "</ul>";

        for (const route of routeStructure) {
            routesRender += rowPrefix;
            routesRender += this.methodToHtml(route.methods, 'div','display:inline-block; padding:5px; margin-right:5px; font-size:10px; background-color:#f6f6f6;');
            routesRender += pathPrefix + route.path + pathSuffix;
            routesRender += prefix + this.methodToHtml(route.middlewares, 'li') + suffix;
            routesRender += rowSuffix;
        }
        routesRender += "</u></body></html>";
        return routesRender;
    }

    private methodToHtml(methods:any, tag:string="div", styles:string="") {
        let html:string = "";
        for (const method of methods) {
            html += this.tagString(method, tag, styles);
        }
        return html;
    }

    private tagString(content:string, tag:string="div", styles:string="") {
        const openTag:string = styles !== "" ? `<${tag} style="${styles}">` : `<${tag}>`;
        const closingTag:string = `</${tag}>`;
        return openTag + content + closingTag;
    }

}

export default AdminController;