import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import express from "express";
import {Response, Request} from "express";
import AbstractController from "./Controller";
import LogHelper from "../Monitoring/Helpers/LogHelper";

abstract class AbstractRoute
{
    /** @abstract Controller of a specific entity. */
    abstract controllerInstance: AbstractController;

    /** @abstract router of a specific entity. */
    abstract routerInstance: express.Router;
    abstract routerInstanceAuthentification: express.Router;

    /**
     * @public @method setupAuthRoutes Setup routes that need user authentication.
     * @return {express.Router} router for the private route.
     */
    public setupAuthRoutes() {
        this.routerInstanceAuthentification.post('/create', this.createHandler.bind(this));
        this.routerInstanceAuthentification.post('/update', this.updateHandler.bind(this));
        this.routerInstanceAuthentification.post('/delete', this.deleteHandler.bind(this));
        return this.routerInstanceAuthentification;
    }


    /**
     * @public @method setupPublicRoutes Setup the public routes.
     * @return {express.Router} router for the public routes
     */
    public setupPublicRoutes() {
        this.routerInstance.post('/search', this.searchHandler.bind(this));
        this.routerInstance.post('/list', this.listHandler.bind(this));
        this.routerInstance.post('/getinfo', this.getInfoHandler.bind(this));
        this.routerInstance.get('/getdoc', this.getDoc.bind(this));
        return this.routerInstance;
    }


    public async createHandler(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.create(req.body.data);
        LogHelper.debug("createHandler", req.user);
        
        if(!response.error)
            this.controllerInstance.createUserHistory(req, res, response, 'create');

        return res.status(response.code).send(response);
    }


    public async updateHandler(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.update(req.body.data);

        if(!response.error)
            this.controllerInstance.createUserHistory(req, res, response, 'update');

        return res.status(response.code).send(response);
    }


    public async searchHandler(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.search(req.body.data);
        return res.status(response.code).send(response);
    }


    public async listHandler(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.list(req.body.data);
        return res.status(response.code).send(response);
    }


    public async deleteHandler(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.delete(req.body.data);

        if(!response.error)
            this.controllerInstance.createUserHistory(req, res, response, 'delete');
        return res.status(response.code).send(response);
    }


    public async getInfoHandler(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.getInfo(req.body.data);
        return res.status(response.code).send(response);
    }

    public async getDoc(req: Request, res: Response): Promise<any> {

        const response:ApiResponseContract = await this.controllerInstance.getDoc();
        const style = '<style> body {white-space : pre; background-color : #22211f; color : white}</style>';

        return res.send(style+response);
    }
}

export default AbstractRoute;