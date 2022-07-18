import express from "express";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import AbstractController from "./Controller";
import {NeedAuthRouteMiddlewares} from "../Authentification/Middleware/NeedAuthRouteMiddlewares";
import {CrudSchemaSanitizer} from "../Security/Middlewares/CrudSchemaSanitizer";


abstract class AbstractRoute {
    /** @abstract Controller of a specific entity. */
    abstract controllerInstance: AbstractController;

    /** @abstract router of a specific entity. */
    abstract routerInstance: express.Router;

    //abstract middlewares:Array<any>;
    //abstract entity ?

    /**
     * @public @method setupAuthRoutes Setup routes that need user authentication.
     * @return {express.Router} router
     */
    public setupAuthRoutes() {
        const defaultEntity:String = "entity";
        //  Create
        this.routerInstance.post('/create', [
                //add all the needed middlewares for auth routes.
                ...NeedAuthRouteMiddlewares.middlewares,
                //get the crud middleware to sanitize all the body values
                CrudSchemaSanitizer.middlewareFunction(defaultEntity),
                this.createHandler.bind(this)
            ]
        );

        //  Update
        this.routerInstance.post('/update', [
            ...NeedAuthRouteMiddlewares.middlewares,//add all the need middlewares for auth routes.
            this.updateHandler.bind(this)
        ]);
        return this.routerInstance;
    }

    /**
     * @public @method setupPublicRoutes Setup the public routes.
     * @return {express.Router} router
     */
    public setupPublicRoutes() {
        const defaultEntity:String = "entity";
        //  Search
        this.routerInstance.post('/search', [
            CrudSchemaSanitizer.middlewareFunction(defaultEntity),
            this.searchHandler.bind(this)
        ]);

        //  List
        this.routerInstance.post('/list', [
                CrudSchemaSanitizer.middlewareFunction(defaultEntity),
                this.listHandler.bind(this)
            ]
        );

        //getinfo the form builder get information about that route.
        this.routerInstance.post('/getinfo', [
                CrudSchemaSanitizer.middlewareFunction(defaultEntity),
                this.getInfoHandler.bind(this)
            ]
        );

        //  Get the documentation.
        this.routerInstance.get('/', [
                CrudSchemaSanitizer.middlewareFunction(defaultEntity),
                this.getDoc.bind(this)
            ]
        );//add this, since the API will only use show documentation for now.

        return this.routerInstance;
    }

    public async createHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.create(req.body.data);
        return res.status(response.code).send(response);
    }

    public async updateHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.update(req.body.data);
        return res.status(response.code).send(response);
    }

    public async searchHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.search(req.body.data);
        return res.status(response.code).send(response);
    }

    public async listHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.list(req.body.data);
        return res.status(response.code).send(response);
    }

    public async deleteHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.delete(req.body.data);
        return res.status(response.code).send(response);
    }

    public async getInfoHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.getInfo(req.body.data);
        return res.status(response.code).send(response);
    }

    public async getDoc(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.getDoc();
        const style = '<style> body {white-space : pre; background-color : #22211f; color : white}</style>'
        return res.send(style + response);
    }
}

export default AbstractRoute;