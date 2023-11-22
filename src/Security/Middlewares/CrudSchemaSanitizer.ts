import {NextFunction, Request, Response} from "express";

//doc : https://express-validator.github.io/docs/sanitization.html
//     /*body('email').isEmail().normalizeEmail(),
//     body('text').not().isEmpty().trim().escape(),
//     body('notifyOnReply').toBoolean(),*/


// Algortihm

//1. Preset the middleware with the target entity of it
//  - Like if it's person or Org.
//2. preset the parser of the schema with the entity's schema
//3. Build a dictionnary for pairing Entity's schema and Express-validation sanitizers.
//4. allow chaining of the sanitization there to be able to the the right functions to sanitized the property correctly.
//5. trace this work in log



/**
 * Santize the request's body base on their model's schema.
 */
export class CrudSchemaSanitizer {

    public static sanitizationDictionary:any

    /**
     * Getter for the anonymous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction(entity:string)
    {
        const entitysSchema:any = entity;
        let entitysSanitizationRules:any = CrudSchemaSanitizer.parseSchema(entitysSchema);

        //since all properties are sanitize by itself in a middleware slot (as an array elements). We need to return an array with all the rules

        /**
         * The CrudSchemaSanitizer anonymous function.
         * @param req {Request}
         * @param res {Response}
         * @param next {NextFunction}
         * @return Promise<Response<any, Record<string, any>> | undefined>
         */
        return async function (req: Request, res: Response, next: NextFunction) {
            entitysSanitizationRules = {};
            next();
        }
    }

    public static parseSchema(schema:any):Array<any> {
        if (CrudSchemaSanitizer.sanitizationDictionary === undefined) {
            //set the dictionary
        }

        return [schema];
    }

}