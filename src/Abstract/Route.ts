import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import AbstractController from "./Controller";
import express from "express";


abstract class AbstractRoute
{
    /** @abstract Controller of a specific entity. */
    abstract controllerInstance: AbstractController;

    /** @abstract router of a specific entity. */
    abstract routerInstance: express.Router;

    /**
     * @public @method setupAuthRoutes Setup routes that need user authentication.
     * @return {express.Router} router
     */
    public setupAuthRoutes() {
        this.routerInstance.post('/create', this.createHandler.bind(this));
        this.routerInstance.post('/update', this.updateHandler.bind(this));
        this.routerInstance.post('/delete', this.deleteHandler.bind(this));
        return this.routerInstance;
    }

    /**
     * @public @method setupPublicRoutes Setup the public routes.
     * @return {express.Router} router
     */
    public setupPublicRoutes() {
        this.routerInstance.post('/search', this.searchHandler.bind(this));
        this.routerInstance.post('/list', this.listHandler.bind(this));
        this.routerInstance.post('/getinfo', this.getInfoHandler.bind(this));
        this.routerInstance.get('/getdoc', this.getDoc.bind(this));
        return this.routerInstance;
    }

    public async createHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.create(req.body.data);
        if(response.error == false)
            this.controllerInstance.createUserHistory(req, res, response, 'create');
        return res.status(response.code).send(response);
    }

    public async updateHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.update(req.body.data);
        if(response.error == false)
            this.controllerInstance.createUserHistory(req, res, response, 'update');
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
        if(response.error == false)
            this.controllerInstance.createUserHistory(req, res, response, 'delete');
        return res.status(response.code).send(response);
    }

    public async getInfoHandler(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.getInfo(req.body.data);
        return res.status(response.code).send(response);
    }

    public async getDoc(req: any, res: any): Promise<ApiResponseContract> {
        const response = await this.controllerInstance.getDoc();
        const style = '<style> body {white-space : pre; background-color : #22211f; color : white}</style>'
        return res.send(style+response);
    }
}
export default AbstractRoute;