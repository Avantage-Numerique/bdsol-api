import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";

export const refType: RefProperty = {
    field: "type",
    ontologyProperty: "avnu:type",
    type: createRefType("string"),
    url: createPrimitiveUrl("type"),
    label: "Type d'entité",
    cardinality: "1..1",
    compatibility: [
        AvnuCompatibility.compatibilityMessage(
            "la propriété @type est nécessaire dans le format json+ld et pour déterminer la classe de l'entité courante."
        ),
    ],
    //Pas le même vocabulaire https://datascene.ca/references/vocabulaires/types_de_contributeurs/
    /* {
        externalSource: {
            name: "Datascene",
            //sparqlEndpoint: ""
        },
        mapping: {
            externalField: "Type de contributeur",
            //ontologyProperty: "",
            //ontologyUri: "",
        },
        documentationUrl: "https://datascene.ca/references/vocabulaires/types_de_contributeurs/",
    }, */
    description: "Type de l'entité statique. Virtuel, statique et non-modifiable.",
    constraints: {
        enum: EntityTypesEnum,
    },
};
