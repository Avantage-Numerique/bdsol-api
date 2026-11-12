import { RefProperty } from "@ref/Data/types";
import { createPrimitiveUrl, createRefType } from "@ref/Data/utils";
import AvnuCompatibility from "@ref/Data/Compatibility/Avnu";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";

export const refLocation: RefProperty = {
    field: "location",
    ontologyProperty: "avnu:location",
    url: "/location",
    label: "Emplacement",
    cardinality: "0..1",
    description: "Lieu et moyen de localisation via une adresse, des coordonnées ou autre.",
    compatibility: [
        AvnuCompatibility.compatibilityMessage(
            "AVNU a combiné l'objet d'adresse, mais un endpoint par ontologie sera fait pour que la structure d'adresse soit respecté."
        ),
    ],
    //note: "",

    type: createRefType("object"),
    ref: [
        {
            field: "address",
            ontologyProperty: "avnu:address",
            url: createPrimitiveUrl("address"),
            type: createRefType("string"),
            label: "Adresse",
            cardinality: "0..1",
            description: "Numéro civique et rue",
            compatibility: [
                SchemaOrgCompatibility.getOntologyCompatibilityArray("streetAddress"),
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "streetAddress",
                    "streetAddress",
                    "https://schema.org/streetAddress"
                ),
                DataSceneCompatibility.getOntologyCompatibilityArray(
                    "streetAddress",
                    "streetAddress",
                    "https://documentation.datascene.ca/references/postal_address/#2-propriete-adresse-postale-postal-address-streetaddress-adresse-postale"
                ),
            ],
            //note: "",
        },
        {
            field: "city",
            ontologyProperty: "avnu:city",
            url: createPrimitiveUrl("city"),
            type: createRefType("string"),
            label: "Ville",
            cardinality: "0..1",
            description: "Nom de la ville",
            compatibility: [
                SchemaOrgCompatibility.getOntologyCompatibilityArray("addressLocality"),
                ArtsdataCompatibility.getOntologyCompatibilityArray(
                    "addressLocality",
                    "addressLocality",
                    "https://schema.org/streetAddress"
                ),
                DataSceneCompatibility.getOntologyCompatibilityArray(
                    "addressLocality",
                    "addressLocality",
                    "https://documentation.datascene.ca/references/postal_address/#3-propriete-adresse-postale-postal-address-addresslocality-localite"
                ),
            ],
            //note: "",
        },
        {
            field: "region",
            ontologyProperty: "avnu:region",
            url: createPrimitiveUrl("region"),
            type: createRefType("string"),
            label: "Région",
            cardinality: "0..1",
            description: "Nom de la région si applicable",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("addressRegion")],
            //note: "",
        },
        {
            field: "mrc",
            ontologyProperty: "avnu:mrc",
            url: createPrimitiveUrl("mrc"),
            type: createRefType("string"),
            label: "Mrc (Municipalité régionale de comté)",
            cardinality: "0..1",
            description: "Ajout par rapport aux propriété de lieu commune.",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("AdministrativeArea")],
            //note: "",
        },
        {
            field: "province",
            ontologyProperty: "avnu:province",
            url: createPrimitiveUrl("province"),
            type: createRefType("string"),
            label: "Province",
            cardinality: "0..1",
            description: "Province ou état",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("addressRegion")],
            //note: "",
        },
        {
            field: "postalCode",
            ontologyProperty: "avnu:postalCode",
            url: createPrimitiveUrl("postalCode"),
            type: createRefType("string"),
            label: "Code postal",
            cardinality: "0..1",
            description: "Code postal",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("postalCode")],
            //note: "",
        },
        {
            field: "country",
            ontologyProperty: "avnu:country",
            url: createPrimitiveUrl("country"),
            type: createRefType("string"),
            label: "Pays",
            cardinality: "0..1",
            description: "Nom du pays",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("addressCountry")],
            //note: "",
        },
        {
            field: "latitude",
            ontologyProperty: "avnu:latitude",
            url: createPrimitiveUrl("latitude"),
            type: createRefType("string"),
            label: "Latitude géographique",
            cardinality: "0..1",
            description: "Latitude géographique en degrés décimaux (valeur flottante, de -90 à 90).",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("latitude")],
            //note: "",
        },
        {
            field: "longitude",
            ontologyProperty: "avnu:longitude",
            url: createPrimitiveUrl("longitude"),
            type: createRefType("string"),
            label: "Longitude géographique",
            cardinality: "0..1",
            description: "Longitude géographique en degrés décimaux (valeur flottante, de -180 à 180).",
            compatibility: [SchemaOrgCompatibility.getOntologyCompatibilityArray("longitude")],
            //note: "",
        },
    ],
};
