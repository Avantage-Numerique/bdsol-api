import express, {RouterOptions} from "express";

//const AuthRouter = express.Router();

export class AuthRouter {

    public router;

    constructor(options?: RouterOptions) {
        this.router = express.Router(options);

        //const verifyToken = VerifyToken.register();

        //@todo this compile, but ts don't like it.
        //this.router.use(VerifyTokenMiddleware.verify);
    }
}