import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refName } from "@ref/Data/Properties/RefName";
import { refShortDescription } from "@ref/Data/Properties/RefShortDescription";
import { refType } from "@ref/Data/Properties/RefType";
import { refMainImageLink } from "@ref/Data/RelationLinks/RefMainImageLink";
import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refMeta } from "../SubSchema/RefMeta";
import { refLocation } from "../SubSchema/RefLocation";

export const refPlace: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        name: refName,
        description: refDescription,
        shortDescription: refShortDescription,
        mainImage: refMainImageLink,
        ...refLocation.fields,
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },
        /* {
            //À MODIFIER QUAND ON VA MERGE LA BRANCHE DE CARTE.
            ...refLocation,
            note: "Présentement pas dans un objet 'location', mais chaque valeur est directement dans l'entité.",
        }, */
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
    },
};
