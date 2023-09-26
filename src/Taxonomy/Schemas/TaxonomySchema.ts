import {Document} from "mongoose"
import {MetaSchema} from "@src/Moderation/Schemas/MetaSchema";
import {TaxonomiesCategoriesEnum} from "../TaxonomiesCategoriesEnum";
import {DomainSchema} from "./DomainSchema";

export interface TaxonomySchema extends Document {
    category:TaxonomiesCategoriesEnum;
    name:string;
    slug:string;
    description:string;
    domains:[DomainSchema];
    source:string;
    meta:MetaSchema;
}
