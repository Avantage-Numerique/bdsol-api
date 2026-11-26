import { Document } from "mongoose";
import { MetaSchema } from "../../Moderation/Schemas/MetaSchema";
import { MemberSchema } from "../../SubProperty/Team/Schemas/MemberSchema";
import { DomainListSchema } from "@src/Taxonomy/Schemas/DomainListSchema";
import { SkillGroupSchema } from "../../Taxonomy/Schemas/SkillGroupSchema";
import { EquipmentLinkSchema } from "@src/Database/Schemas/EquipmentLinkSchema";
import { SocialHandleSchema } from "@src/Database/Schemas/SocialHandleSchema";
import { ContactPointSchema } from "@src/Database/Schemas/ContactPointSchema";
import { UriObject } from "@src/Database/Schemas/URISchema";
import { ObjectId } from "mongodb";
import { SameAs } from "@src/Database/Schemas/SameAsSchema";

export interface OrganisationSchema extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    url: [SocialHandleSchema];
    contactPoint: ContactPointSchema;
    fondationDate: Date;
    offers: [SkillGroupSchema];
    domains: [DomainListSchema];
    team: [MemberSchema];
    mainImage: ObjectId;
    catchphrase: string;
    location: [ObjectId];
    equipment: [EquipmentLinkSchema];
    region: string;
    badges: [string];
    sameAs: [SameAs];
    meta: MetaSchema;
    uri: UriObject;
}
