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
                export: (doc) => [{ "@value": doc.name, "@language": "fr" }],
            },
            url: {
                fields: ["contactPoint.website.url"],
                export: (doc) => doc.contactPoint?.website?.url,
            },
            sameAs: {
                fields: ["sameAs"],
                export: (doc) => doc.sameAs?.map((elem: any) => elem.url),
            },
            description: {
                fields: ["description"],
                export: (doc) => doc.description,
            },
            //image..?
            //We don't store this type of information (such as Canadian Business Number)
            /*
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Example Arts Organization",
                "url": "https://example.org",
                "identifier": {
                    "@type": "PropertyValue",
                    "propertyID": "BN",
                    "value": "801228875"*
                }
            }
            */
            /* identifier: {
                fields: ["uri"],
                export: (doc) => doc.uri,
            }, */
            disambiguatingDescription: {
                fields: ["shortDescription"],
                export: (doc) => doc.shortDescription,
            },
            //Pas sûr de comment modifier l'entité pour l'export vu que c'est un id.
            //Pas sûr avec address aussi qui existe. À valider avec le nouveau format de lieu suite à la carte
            /* location: {
                fields: ["location"],
                export: (doc) =>
                    doc.location.map((el: any) => ({
                        "@type": "Place",
                        "@id": el,//uri!
                    })),
            }, */
        },
    },
};
