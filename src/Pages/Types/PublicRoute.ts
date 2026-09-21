import { Request, Response } from "express";

export interface PublicRoute {
    request?: Request;
    response?: Response;
    name?: string;
    url?: string;
    pathName?: string;
}
