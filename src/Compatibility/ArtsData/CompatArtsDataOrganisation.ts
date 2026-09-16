import { CompatibilityOntology } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityDBOrganisationToArtsData: CompatibilityOntology = {
    [EntityTypesEnum.organisation]: {
        "@type": "Organization",
        description:
            "Sous classe de http://schema.org/Thing. Dans le modèle de donnée d'Artsdata, schema:Organization est aussi une sous classe de dbo:Agent.",
        external: "https://docs.artsdata.ca/classes/organization.html",
        compatibility: {
            name: {
                fields: ["name"],
                source: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                source: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                source: (doc) => doc.shortDescription,
            },
            /* "location": {
            fields: ["location"],
            source: (doc) => doc.map(), //map les locations
        }, */
            /* image: {
            fields: ["mainImage"],
            source: (doc) => doc.mainImage,
        }, */
        },
    },
};
