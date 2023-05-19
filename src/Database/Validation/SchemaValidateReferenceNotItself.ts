import mongoose, {ObjectId, Types} from 'mongoose';
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

//mongoose.Document<any>
const isSameId = async function(id:ObjectId, targetId:ObjectId) {
    return id === targetId;
}


const schemaValidateNoReferenceToItself = async function(targetDocument: mongoose.Document, refId: Types.ObjectId | undefined, mongooseModel:any, targetProperty:string) {

    if (!refId) {
        return true;
    }

    /*@ts-ignore*/
    const refere:any = await mongooseModel.findById(refId);

    if (!refere) {
        throw new Error(`Document refered to with id ${refId} not found`);
    }

    /*@ts-ignore*/
    const target:any = targetDocument[targetProperty];

    LogHelper.debug("schemaValidateNoReferenceToItself targetDocument", targetDocument, "refere", refere, "refId", refId);

    if (refere._id.equals(target)) {
        throw new Error(`A document cannot reference itself in a relationship`);
    }

    return true;
}

const taxonomyDomainNoSelfReference = async function(this: mongoose.Document<any>, refId: Types.ObjectId | undefined) {
    LogHelper.debug("taxonomyDomainNoSelfReference Document", this, refId);
    return schemaValidateNoReferenceToItself(this, refId, Taxonomy.getInstance().mongooseModel, "domain");
}

export {taxonomyDomainNoSelfReference, isSameId};