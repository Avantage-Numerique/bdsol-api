import mongoose, {Types} from 'mongoose';
import Taxonomy from "../../Taxonomy/Models/Taxonomy";


const schemaValidateNoReferenceToItself = async function(targetDocument: mongoose.Document<any>, refId: Types.ObjectId | undefined, mongooseModel:any, targetProperty:string) {

    if (!refId) {
        return true;
    }

    /*@ts-ignore*/
    const refere:any = await mongooseModel.findById(refId);

    if (!refere) {
        throw new Error(`Document refered to with id ${refId} not found`);
    }

    /*@ts-ignore*/
    if (refere._id.equals(targetDocument[targetProperty])) {
        throw new Error(`A document cannot reference itself in a relationship`);
    }

    return true;
}


const taxonomyDomainNoSelfReference = async function(this: mongoose.Document<any>, refId: Types.ObjectId | undefined) {
    return schemaValidateNoReferenceToItself(this, refId, Taxonomy.getInstance().mongooseModel, "domain");
}

export {taxonomyDomainNoSelfReference};