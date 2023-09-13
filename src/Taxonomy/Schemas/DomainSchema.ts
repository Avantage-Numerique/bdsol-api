import mongoose, {Document} from "mongoose"
import { MetaSchema } from "../../Moderation/Schemas/MetaSchema";

export interface DomainSchema extends Document {
    domain:mongoose.Types.ObjectId;
    subMeta:MetaSchema;
}
