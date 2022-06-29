import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import AbstractController from "./Controller";
import express from "express";


abstract class AbstractRoute
{
    abstract controllerInstance: AbstractController;
    abstract routerInstance: express.Router;

    public setupRoutes()
    {
        this.routerInstance.post('/create', this.createHandler.bind(this));
        this.routerInstance.post('/update', this.updateHandler.bind(this));
        this.routerInstance.post('/search', this.searchHandler.bind(this));
        //this.routerInstance.post('/list', this.listHandler.bind(this));
        //this.routerInstance.post('/delete', this.deleteHandler.bind(this));
        //this.routerInstance.post('/getinfo', this.getInfoHandler.bind(this));
        return this.routerInstance;
    }

    public setupPublicRoutes()
    {
        this.routerInstance.post('/search', this.searchHandler.bind(this));
        this.routerInstance.post('/list', this.listHandler.bind(this));
        this.routerInstance.post('/getinfo', this.getInfoHandler.bind(this));
        return this.routerInstance;
    }


    public async createHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        const response = await this.controllerInstance.create(req.body.data);
        return res.status(response.code).send(response);
    }


    public async updateHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        const response = await this.controllerInstance.update(req.body.data);
        return res.status(response.code).send(response);
    }


    public async searchHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        const response = await this.controllerInstance.update(req.body.data);
        return res.status(response.code).send(response);
    }


    public async listHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        const response = await this.controllerInstance.update(req.body.data);
        return res.status(response.code).send(response);

    }


    public async deleteHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        const response = await this.controllerInstance.delete(req.body.data);
        return res.status(response.code).send(response);

    }


    public async getInfoHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        const response = await this.controllerInstance.getInfo(req.body.data);
        return res.status(response.code).send(response);
    }
}

export default AbstractRoute;