
export class Error {

    //public statusCode;
    public response;

    constructor(response:object) {
        if (typeof response === 'object') {
            this.response = response;
        }
    }

}

/**
 * Erreur dansService : Delete.
 */
/*
error: false,
code: StatusCodes.ACCEPTED,
deleted: true,//abstrack that ? like : ActionSucceed : true false ?
message: "Item will be deleted",
data: {
    item
}
 */