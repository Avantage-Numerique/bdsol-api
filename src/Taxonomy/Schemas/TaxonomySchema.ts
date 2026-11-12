import { Document } from "mongoose";
import { MetaSchema } from "@src/Moderation/Schemas/MetaSchema";
import { TaxonomiesCategoriesEnum } from "../TaxonomiesCategoriesEnum";
import { DomainListSchema } from "./DomainListSchema";

export interface TaxonomySchema extends Document {
    category: TaxonomiesCategoriesEnum;
    name: string;
    slug: string;
    description: string;
    domains: [DomainListSchema];
    source: string;
    meta: MetaSchema;
}
