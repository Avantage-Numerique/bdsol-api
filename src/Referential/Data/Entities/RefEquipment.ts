import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refType } from "../Properties/RefType";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refTaxonomyLink } from "../RelationLinks/RefTaxonomyLink";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { RefEntityOrSchema } from "../types";

export const refEquipment: RefEntityOrSchema = {
    ontologyProperty: "avnu:equipment",
    url: "/equipment",
    label: "Équipement",
    description: "Entité décrivant un équipement, son modèle, sa marque, ses particularités.",
    compatibility: [],
    //note: "",
    ref: [
        { ...refType },
        {
            field: "name",
            type: "string",
            label: "Nom combiné de l'équipement",
            description:
                "Libellé retourné par l'API qui est une concaténation de la marque, du modèle et du libellé de l'équipement",
            note: "Champ virtuel retournée par l'API.",
        },
        {
            ...refTaxonomyLink,
            field: "equipmentType",
            label: "Type d'équipement",
            cardinality: "1..1",
            description: "Type de l'équipement, catégorisé par une taxonomie.",
        },
        {
            ...refName,
            field: "label",
            description: "Nom de l'equipement, ce dont il s'agit en français.",
            note: "Aucune restriction de longueur minimal, mais requis.",
        },
        { ...refDescription },
        {
            field: "brand",
            //ontologyProperty: "avnu:brand",
            //url: "/brand",
            type: "string",
            label: "Marque",
            cardinality: "0..1",
            description: "Compagnie ou marque qui produit l'équipement.",
            compatibility: [],
            //note: "",
        },
        {
            field: "modelName",
            //ontologyProperty: "avnu:modelName",
            //url: "/modelName",
            type: "string",
            label: "Nom du modèle",
            cardinality: "0..1",
            description: "Modèle de l'équipement",
            compatibility: [],
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
