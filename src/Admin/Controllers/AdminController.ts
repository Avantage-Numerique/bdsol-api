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

    private getHomePageLink():string {
        return `<div><a href="/admin" title="Admin accueil">Retour au Dashboard</a></div>`;
    }

    public async renderAdminDashboard() {

        //let content:string = "<a href='https://51.222.24.157:9443/api/stacks/webhooks/3eaba35f-3914-4a8e-98e5-ff85ceb54663' title=''>Repartir le stack avec un webhook 8-)</a>";
        let content:string = `<ul>
                <li><a href="/admin/bd" title="manage docker">Manage docker</a></li>
                <li><a href="/admin/routes" title="manage routes">Check routes structure</a></li>
            </ul>`;
        return `<html lang="en"><head><title>BDSOL API</title></head><body>${content}</body></html>`;
    }

    public async renderDockerManager() {

        //let content:string = "<a href='https://51.222.24.157:9443/api/stacks/webhooks/3eaba35f-3914-4a8e-98e5-ff85ceb54663' title=''>Repartir le stack avec un webhook 8-)</a>";
        let content:string = `<form action="https://51.222.24.157:9443/api/stacks/webhooks/3f09db09-ec61-4d71-a85a-3f691d8ac6c9" method="post">
                      Redeploy stack containers with latest image of same tag <input type="submit" />
                    </form>`;
        return `<html lang="en"><head><title>BDSOL API</title></head>
                <body>
                    ${this.getHomePageLink()}
                    ${content}
                </body>
            </html>`;
    }

    public async renderRoutesStructure(){
        const routeStructure:any = listEndpoints(api.express);
        let routesRender:string = `<html lang='fr'><body>${this.getHomePageLink()}<ul style='display: flex; flex-direction: row; justify-content: start; align-items: start; flex-wrap: wrap;padding: 0; list-style: none; margin: 0;'>`;

        const rowPrefix:string = "<li style='padding: 1rem; margin:2rem;'>";
        const rowSuffix:string = "</li>";

        const pathPrefix:string = "<h3>";
        const pathSuffix:string = "</h3>";

        const prefix:string = "<ul>";
        const suffix:string = "</ul>";

        let basesRoutes:Map<string, string> = new Map();

        for (const route of routeStructure) {

            const segments:Array<any> = route.path.split("/");
            segments.shift();//remove the base empty string before the base /.

            const basePathName:string = `${segments[0]}` ?? "notset";
            const pathColor:string = this.getRandomColor();

            if (!basesRoutes.get(basePathName)) {
                basesRoutes.set(basePathName, pathColor);
            }
            let color:string = basesRoutes.get(basePathName) ?? "#FF0000";
            const border:string = "2px solid "+color+";";
            routesRender += "<li style='padding: 1rem; margin:2rem; border-left:"+border+"'>";
            routesRender += this.methodToHtml(route.methods, 'div','display:inline-block; padding:5px; margin-right:5px; font-size:10px; background-color:#F8F8F8; border-top:'+border);
            routesRender += pathPrefix + route.path + " (" + basePathName + " ) " + pathSuffix;
            routesRender += prefix + this.methodToHtml(route.middlewares, 'li') + suffix;
            routesRender += "</li>";

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

    private getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

export default AdminController;