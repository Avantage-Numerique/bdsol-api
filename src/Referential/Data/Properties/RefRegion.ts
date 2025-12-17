import { RefPropertyPrimitive } from "../types";

export const refRegion: RefPropertyPrimitive = {
    field: "region",
    ontologyProperty: "avnu:region",
    url: "/region",
    label: "Région",
    type: "string",
    cardinality: "0..1",
    compatibility: [
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
    ],
    description:
        "Région d'appartenance. Texte parmi la liste : ['', 'abitibi-temiscamingue', 'north Ontario', 'baies-james', 'other']",
};
