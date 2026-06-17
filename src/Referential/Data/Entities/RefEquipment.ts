import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refName } from "@ref/Data/Properties/RefName";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import { refType } from "@ref/Data/Properties/RefType";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { refTaxonomyLink } from "@ref/Data/RelationLinks/RefTaxonomyLink";
import { refSocialHandle } from "@ref/Data/SubSchema/RefSocialHandle";
import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import { refSameAs } from "@ref/Data/Properties/RefSameAs";

export const refEquipment: RefProperty = {
    ontologyProperty: "avnu:Equipment",
    url: "/equipment",
    label: "Equipement",
    description: "Entité décrivant un équipement, son modèle, sa marque, ses particularités.",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("Product")],
    //note: "",
    type: createRefType("object"),
    ref: [
        { ...refType },
        {
            field: "name",
            ontologyProperty: "avnu:equipmentName",
            type: createRefType("string"),
            url: createPrimitiveUrl("equipmentName"),
            label: "Nom combiné de l'équipement",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("name")], //alternateName
            description:
                "Libellé retourné par l'API qui est une concaténation de la marque, du modèle et du libellé de l'équipement",
            note: "Champ virtuel retournée par l'API.",
        },
        {
            ...refTaxonomyLink,
            field: "equipmentType",
            label: "Type d'équipement",
            ontologyProperty: "avnu:category",
            cardinality: "1..1",
            description: "Type de l'équipement, catégorisé par une taxonomie.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("category")],
        },
        {
            ...refName,
            field: "label",
            ontologyProperty: "avnu:alternateName",
            description: "Nom de l'equipement, ce dont il s'agit en français.",
            note: "Aucune restriction de longueur minimal, mais requis.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("alternateName")],
        },
        { ...refDescription },
        { ...refShortDescription },
        {
            field: "brand",
            ontologyProperty: "avnu:brand",
            url: createPrimitiveUrl("brand"),
            type: createRefType("string"),
            label: "Marque",
            cardinality: "0..1",
            description: "Compagnie ou marque qui produit l'équipement.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("brand")],
            //note: "",
        },
        {
            field: "modelName",
            ontologyProperty: "avnu:model",
            url: createPrimitiveUrl("modelName"),
            type: createRefType("string"),
            label: "Nom du modèle",
            cardinality: "0..1",
            description: "Modèle de l'équipement",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("model")],
            //note: "",
        },
        { ...refMainImageLink },
        { ...refSocialHandle },

        { ...refSameAs },

        //Ontologie:
        //array de media

        //Hors-ontologie :
        //slug
        //meta
    ],
};
