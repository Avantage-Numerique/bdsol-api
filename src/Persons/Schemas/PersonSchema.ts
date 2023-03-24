import {Document} from "mongoose";
import Media from "../../Media/Models/Media";
import { Status } from "../../Moderation/Schemas/StatusSchema";
import {DomainSchema} from "../../Taxonomy/Schemas/DomainSchema";

export interface PersonSchema extends Document {
    lastName:string;
    firstName:string;
    slug:string;
    nickname:string;
    description:string;
    occupations:[object];
    domains:[DomainSchema];
    mainImage:Media;//ça fonctionne ça ?
    catchphrase:string;
    status: Status;
}