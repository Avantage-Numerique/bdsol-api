import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { refCatchphrase } from "../Properties/ReferentialCatchphrase";
import { refDescription } from "../Properties/ReferentialDescription";
import { refType } from "../Properties/ReferentialType";
import { refContactPoint } from "../SubSchema/ReferentialContactPoint";
import { refDomainList } from "../SubSchema/ReferentialDomainList";
import { refSkillGroup } from "../SubSchema/ReferentialSkillGroup";
import { refSocialHandle } from "../SubSchema/ReferentialSocialHandle";
import { refTeam } from "../SubSchema/ReferentialTeam";
import { RefEntityOrSchema } from "../types";
import { refName } from "../Properties/ReferentialName";
import { refEquipmentLink } from "../SubSchema/ReferentialEquipmentLink";
import { refRegion } from "../Properties/ReferentialRegion";
import { refBadges } from "../Properties/ReferentialBadges";

export const refOrganization: RefEntityOrSchema = {
    ontologyProperty: "avnu:organisation",
    url: "/organisation",
    label: "Organisation",
    description: "",
    compatibility: [],
    note: "",
    ref: [
        { ...refType },
        //Identifiant
        //Pas implémenté dans notre api
        /* {
                    label: "Identifiants",
                    type: "list",//?
                    compatibility: {
                        schemaorg: ["identifier", "https://schema.org/identifier"],
                        datascene: ["Identifiants", "https://datascene.ca/references/proprietes/identifiant/"],
                    },
                }, */
        { ...refName },
        //Alternate name
        { ...refDescription },
        //short-description
        {
            field: "fondationDate",
            type: "date",
            //ontologyProperty: "fondationDate",
            //url: "/fondationDate",
            label: "Date de fondation",
            cardinality: "0..1",
            description: "Date où l'entité a été fondé.",
            compatibility: [],
            //note: "",
        },
        { ...refCatchphrase },
        {
            ...refSocialHandle,
            field: "url",
        },
        { ...refContactPoint },
        {
            ...refSkillGroup,
            field: "offers",
        },
        { ...refDomainList },
        { ...refTeam },

        {
            field: "mainImage",
            //ontologyProperty: "an:mainImage",
            label: "Média",
            type: "id",
            entityRef: [EntityTypesEnum.media],
            cardinality: "0..1",
            compatibility: [],
            description: "Référence à une image stockée sur notre serveur comme image de profil.",
        },
        {
            field: "location",
            //ontologyProperty: "an:mainImage",
            label: "Lieu",
            type: "id",
            entityRef: [EntityTypesEnum.place],
            cardinality: "0..N",
            compatibility: [],
            description: "Référence à une entité Place, qui décrit un lieu.",
        },
        { ...refEquipmentLink },
        { ...refRegion },
        { ...refBadges },
        //Projets
        //Participant à des événement list[]
        //meta
        //slug
    ],
};
