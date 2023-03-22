import mongoose, {Document} from "mongoose"
import { StatusSchema } from "../../Moderation/Schemas/StatusSchema";

export interface DomainSchema extends Document {
    domain:mongoose.Types.ObjectId;
    status:StatusSchema;
}
