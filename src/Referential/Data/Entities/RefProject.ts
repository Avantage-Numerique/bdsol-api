import { RefEntityOrSchema } from "../types";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { refDescription } from "../Properties/RefDescription";
import { refName } from "../Properties/RefName";
import { refType } from "../Properties/RefType";
import { refContactPoint } from "../SubSchema/RefContactPoint";
import { refSocialHandle } from "../SubSchema/RefSocialHandle";
import { refTeam } from "../SubSchema/RefTeam";
import { refDomainList } from "../SubSchema/RefDomainList";
import { refOrganisationLink } from "../RelationLinks/RefOrganisationLink";
import { refSponsor } from "../SubSchema/RefSponsor";
import { refScheduleBudget } from "../SubSchema/RefScheduleBudget";
import { refPlaceLink } from "../RelationLinks/RefPlaceLink";
import { refMainImageLink } from "../RelationLinks/RefMainImageLink";
import { refEquipmentLinkSimpleArray } from "../RelationLinks/RefEquipmentLinkSimpleArray";
import { refTaxonomyLink } from "../RelationLinks/RefTaxonomyLink";

export const refProject: RefEntityOrSchema = {
    ontologyProperty: "avnu:project",
    url: "/project",
    label: "Projet",
    description: "",
    compatibility: [],
    //note:"",
    ref: [
        { ...refType },
        { ...refName },
        {
            field: "alternateName",
            type: "string",
            //ontologyProperty: "avnu:alternateName",
            //url: "/alternateName",
            label: "Nom secondaire",
            cardinality: "0..1",
            description: "Autre nom sous lequel le projet est également connu.",
            compatibility: [
                //schemaOrg:alternateName
            ],
            //note: "",
        },
        { ...refDescription },
        {
            ...refOrganisationLink,
            field: "entityInCharge",
            label: "Entité en charge / Créateur·rice",
        },
        {
            ...refOrganisationLink,
            field: "producer",
            label: "Producteur·rice",
        },
        { ...refSocialHandle },
        { ...refContactPoint },
        { ...refPlaceLink },
        { ...refTeam },
        { ...refMainImageLink },
        { ...refSponsor },
        { ...refScheduleBudget },
        {
            ...refTaxonomyLink,
            field: "skills",
            label: "Compétences ou technologies",
            cardinality: "0..N",
            description: "Référence à une ou plusieurs taxonomies de type 'skills' ou 'technologies'.",
            //note: "Restreint à un type particulier?"
        },
        { ...refDomainList },
        {
            field: "context",
            //ontologyProperty: "avnu:context",
            //url: "/context",
            type: "string",
            label: "Contexte du projet",
            cardinality: "0..1",
            description: "Contexte du projet. Enum 'academic', 'hobby', 'professional'.",
            compatibility: [],
            //note: "",
        },
        { ...refEquipmentLinkSimpleArray },

        //Ontologie :
        //Identifiant
        //Short-description
        //Média => pas une liste d'image
        //Événement
        //Langues
        //Sans parole

        //Hors ontologie
        //slug
        //meta
    ],
};
