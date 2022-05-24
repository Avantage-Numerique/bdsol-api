import express from "express";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {ErrorResponse} from "../Responses/ErrorResponse";

// add { mergeParams: true } to get the main route params.
const ApiErrorsRouter = express.Router();

//  CRUD


// USER/UPDATE

ApiErrorsRouter.post('*', async (req, res, ) => {

    LogHelper.info(`The requestion : ${req} `+ReasonPhrases.NOT_FOUND);

    return res.status(StatusCodes.NOT_FOUND).send(
        ErrorResponse.create(
            new Error(ReasonPhrases.NOT_FOUND),
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
        )
    );
});

export {ApiErrorsRouter};