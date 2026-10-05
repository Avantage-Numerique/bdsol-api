import { RefProperty } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refTaxonomyLink } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import { refOrder } from "@ref/Data/Properties/RefOrder";

export const refDomainList: RefProperty = {
    field: "domains",
    label: "Domaine d'activité",
    ontologyProperty: "avnu:domainList",
    url: "/domainList",
    cardinality: "0..N",
    description: "Taxonomie de catégorie 'domain'.",
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    type: createRefType("object"),
    ref: [
        {
            ...refTaxonomyLink,
            field: "domain",
            label: "Domaine",
            cardinality: "0..1",
            description: "Référence à une taxonomie de type 'domain'",
            compatibility: [AvnuCompatibility.compatibilityMessage()],
        },
        { ...refOrder },
    ],
};
