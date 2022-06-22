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
        this.routerInstance.post('/list', this.listHandler.bind(this));
        this.routerInstance.post('/delete', this.deleteHandler.bind(this));
        this.routerInstance.post('/getinfo', this.getInfoHandler.bind(this));
        return this.routerInstance;
    }


    public async createHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        return await this.controllerInstance.create(req, res);
    }


    public async updateHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        return await this.controllerInstance.update(req, res);
    }


    public async searchHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        return await this.controllerInstance.update(req, res);
    }


    public async listHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        return await this.controllerInstance.update(req, res);
    }


    public async deleteHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        return await this.controllerInstance.delete(req, res);
    }


    public async getInfoHandler(req: any, res: any): Promise<ApiResponseContract>
    {
        return await this.controllerInstance.getInfo(req, res);
    }
}

export default AbstractRoute;