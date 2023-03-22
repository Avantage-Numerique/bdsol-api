import {Document} from "mongoose"
import { Status } from "../../Moderation/Schemas/StatusSchema";
import Media from "../../Media/Models/Media";
import { Member } from "../../Database/Schemas/MemberSchema";
import {DomainSchema} from "../../Taxonomy/Schemas/DomainSchema";

export interface OrganisationSchema extends Document {
    name:string;
    slug:string;
    description:string;
    url:string;
    contactPoint:string;
    fondationDate:Date;
    offers:[object];
    domains:[DomainSchema];
    team: [Member];
    mainImage:Media;
    catchphrase:string;
    status: Status;
}
