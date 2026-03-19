import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refType } from "../Properties/RefType";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refTaxonomyLink } from "../RelationLinks/RefTaxonomyLink";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { RefProperty } from "../types";
import { createPrimitiveUrl, createRefType } from "../utils";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";

export const refEquipment: RefProperty = {
    ontologyProperty: "avnu:equipment",
    url: "/equipment",
    label: "Équipement",
    description: "Entité décrivant un équipement, son modèle, sa marque, ses particularités.",
    compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("Product")],
    //note: "",
    type: createRefType("object"),
    ref: [
        { ...refType },
        {
            field: "name",
            ontologyProperty: "avnu:equipment.name",
            type: createRefType("string"),
            url: createPrimitiveUrl("equipment.name"),
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

        //Ontologie:
        //array de media

        //Hors-ontologie :
        //slug
        //meta
    ],
};
