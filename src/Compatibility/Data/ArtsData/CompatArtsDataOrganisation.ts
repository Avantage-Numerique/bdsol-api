import { CompatibilityOntology } from "../../types";
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
                export: (doc) => doc.name,
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            /* "location": {
            fields: ["location"],
            export: (doc) => doc.map(), //map les locations
        }, */
            /* image: {
            fields: ["mainImage"],
            export: (doc) => doc.mainImage,
        }, */
        },
    },
};
