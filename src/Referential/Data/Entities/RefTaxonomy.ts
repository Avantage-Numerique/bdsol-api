import { TaxonomiesCategoriesEnum } from "@src/Taxonomy/TaxonomiesCategoriesEnum";
import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refType } from "../Properties/RefType";
import { refDomainList } from "../SubSchema/RefDomainList";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refTaxonomy: RefProperty = {
    ontologyProperty: "avnu:taxonomy",
    url: "/taxonomy",
    label: "Taxonomie (catégorie)",
    description: "Vocabulaire de catégorie pour décrire et regrouper des compétences, des technologies ou autres.",
    compatibility: [
        AvnuCompatibility.getOntologyCompatibilityArray("taxonomy"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("DefinedTerm"),
        DataSceneCompatibility.getOntologyCompatibilityArray("term", "Term"),
    ],
    //note: "",

    type: createRefType("object"),
    ref: [
        { ...refType },
        {
            field: "category",
            ontologyProperty: "avnu:category",
            url: "/category",
            type: createRefType("string"),
            label: "Type de taxonomie",
            cardinality: "1..1",
            description:
                "Vocabulaire pour distinguer quel type de taxonomie il s'agit. S'il s'agit d'une compétence, ou d'une technologie par exemple.",
            compatibility: [],
            constraints: {
                enum: TaxonomiesCategoriesEnum,
            },
            note: "Fait partie de l'enum 'TaxonomiesCategoriesEnum'. Ces vocabulaires servent à décrire des groupes de quelque chose, autant de compétence, technologie ou type d'événement et type d'équipement etc.",
        },
        { ...refName },
        { ...refDescription },
        {
            ...refDomainList,
            description: "Domaine parent de la taxonomie, voire vocabulaire qui regroupe la taxonomie.",
            note: "Le ou les domaines ici ne peuvent pas se référencer eux même. (Une taxonomie de type domaine, ne peux pas faire partie de son propre domaine).",
        },
        //Ontologie:
        //Vocabulaire
        //Version
        //Code
        //Order

        //Pas ontologie:
        //slug
        //meta
    ],
};
