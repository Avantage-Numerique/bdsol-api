import { TaxonomiesCategoriesEnum } from "@src/Taxonomy/TaxonomiesCategoriesEnum";
import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refName } from "@ref/Data/Properties/RefName";
import { refType } from "@ref/Data/Properties/RefType";
import { refDomainList } from "@ref/Data/SubSchema/RefDomainList";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import { refMeta } from "../SubSchema/RefMeta";

export const refTaxonomy: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        category: {
            cardinality: "1..1",
            type: createRefType("string"),
            constraints: {
                enum: TaxonomiesCategoriesEnum,
            },
        },
        name: refName,
        description: refDescription,
        domains: {
            cardinality: "0..N",
            type: createRefType("object"),
            fields: refDomainList.fields,
        },
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },
        //Ontologie:
        //Vocabulaire
        //Version
        //Code
        //Order

        //Pas ontologie:
        //slug
        //meta
    },
};
