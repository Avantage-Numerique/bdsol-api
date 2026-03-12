import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refShortDescription } from "../Properties/RefShortDescription";
import { refType } from "../Properties/RefType";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refLocation } from "../SubSchema/RefLocation";
import { RefProperty } from "../types";
import { createRefType } from "../utils";

export const refPlace: RefProperty = {
    ontologyProperty: "avnu:place",
    url: "/place",
    label: "Lieu",
    description: "Entité décrivant un lieu, son emplacement physique ou virtuel.",
    compatibility: [],
    //note: "",

    type: createRefType("object"),
    ref: [
        { ...refType },
        { ...refName },
        { ...refDescription },
        { ...refShortDescription },
        { ...refMainImageLink },
        {
            //À MODIFIER QUAND ON VA MERGE LA BRANCHE DE CARTE.
            ...refLocation,
            note: "Présentement pas dans un objet 'location', mais chaque valeur est directement dans l'entité.",
        },
        //Ontologie:
        //Identifiant
        //short-description
        //mainImage version array
        //rooms (liste de salle)
        //type de lieu
        //virtuel (booléen qui dit si le lieu est physique ou non)
        //centroid (GeoData)

        //Hors ontologie:
        //slug
        //meta
    ],
};
