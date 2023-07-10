import {Document} from "mongoose"
import {StatusSchema} from "@src/Moderation/Schemas/StatusSchema";
import {TaxonomiesCategoriesEnum} from "../TaxonomiesCategoriesEnum";
import {DomainSchema} from "./DomainSchema";

export interface TaxonomySchema extends Document {
    category:TaxonomiesCategoriesEnum;
    name:string;
    slug:string;
    description:string;
    domains:[DomainSchema];
    source:string;
    meta?:string;
    status:StatusSchema;
}
