import {IRoute, Router, Request, RequestHandler, Response} from 'express';
import {IRouterHandler} from "express-serve-static-core";


export class ApiController implements IRoute {
    path: string;
    stack: any;

    constructor(){
        this.path = "/";
    }

    public all(handerl: RequestHandler): IRouterHandler<this, Route> {
        return this as Route;
    }

    get(handerl: RequestHandler): any {
        return this;
    }

    post(handerl: RequestHandler): any {
        return this;
    }

    put(handerl: RequestHandler): any {
        return this;
    }

    delete(handerl: RequestHandler): any {
        return this;
    }

    patch(handerl: RequestHandler): any {
        return this;
    }

    options(handerl: RequestHandler): any {
        return this;
    }

    head(handerl: RequestHandler): any {
        return this;
    }
}