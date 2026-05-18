import { RegionEnum } from "@src/SubProperty/Badges/RegionEnum";
import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";

export const refRegion: RefProperty = {
    field: "region",
    ontologyProperty: "avnu:region",
    url: createPrimitiveUrl("region"),
    label: "Région",
    type: createRefType("string"),
    cardinality: "0..1",
    compatibility: [AvnuCompatibility.compatibilityMessage()],
    //Propriété non conforme à datascene "associations géographiques".
    //Similaire à "associations géographiques: ville", mais pas array
    /* {
        externalSource: {
            name: "Datascene",
        },
        mapping: {
            externalField: "Associations géographiques",
            //ontologyProperty: "",
            //ontologyUri: "",
        },
        documentationUrl: "https://datascene.ca/references/proprietes/contributeur/",
    }, */
    description:
        "Région d'appartenance. Texte parmi la liste : ['', 'abitibi-temiscamingue', 'north Ontario', 'baies-james', 'other']",
    constraints: {
        enum: RegionEnum,
    },
};
