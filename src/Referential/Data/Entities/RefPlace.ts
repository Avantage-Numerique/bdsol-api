import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refShortDescription } from "../Properties/RefShortDescription";
import { refType } from "../Properties/RefType";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refLocation } from "../SubSchema/RefLocation";
import { RefProperty } from "../types";
import { createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";

export const refPlace: RefProperty = {
    ontologyProperty: "avnu:Place",
    url: "/place",
    label: "Lieu",
    description: "Entité décrivant un lieu, son emplacement physique ou virtuel.",
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray(
            "place",
            "Place",
            "https://docs.artsdata.ca/classes/place.html"
        ),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("Place"),
        DataSceneCompatibility.getOntologyCompatibilityArray("place", "Place"),
    ],
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
