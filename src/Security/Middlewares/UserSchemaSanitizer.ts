import {NextFunction, Request, Response} from "express";
import { body } from 'express-validator';//, validationResult, checkSchema

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
export class UserSchemaSanitizer {

    public static sanitizationDictionary:any

    public sanitizationSchema:any = {
        'data.email': {
            in: ['body'],
            isEmail: {
                bail: true,
            },
            errorMessage: 'Email isn\'t correctly formed',
            isString: true,
            // Sanitizers can go here as well
            toString: true,
            normalizeEmail: true,
        },
        'data.password': {
            in: ['body'],
            isLength: {
                errorMessage: 'Password should be at least 7 chars long',
                // Multiple options would be expressed as an array
                options: { min: 7 },
            },
        },
        'data.username': {
            isUppercase: {
                // To negate a validator
                negated: true,
            },
            rtrim: {
                // Options as an array
                options: [[' ', '-']],
            },
        },
        // Support bail functionality in schemas
        email: {
            isEmail: {
                bail: true,
            },
        },
    }

    /**
     * Getter for the anonymous function that will act as the middleware, with the parameters and the next() call.
     */
    public static middlewareFunction(entity:String)
    {
        const entitysSchema:any = "User" || entity;
        let entitysSanitizationRules:any = UserSchemaSanitizer.parseSchema(entitysSchema);

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

    public static sanitizingMethods():Array<any> {
        return [
            body('data.email').isString().isEmail().trim().escape().normalizeEmail(),
            body('data.username').isString().trim().escape(),
            body('data.password').isString(),
        ];
    }

    public static parseSchema(schema:any):Array<any> {
        if (UserSchemaSanitizer.sanitizationDictionary === undefined) {
            //set the dictionary
        }

        return [schema];
    }

}