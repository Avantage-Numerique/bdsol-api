import { CompatibleOntologiesEnum, OntologyMetaData } from "../types";

const SchemaOrgMetaData: OntologyMetaData = {
    referentialUrl: "https://schema.org",
    ontologyUrl: "https://schema.org",
    contextUrl: "https://schema.org",
    prefix: "schema",
    name: CompatibleOntologiesEnum.Schemaorg,
    label: "Schema.org",
    icon: "la-pencil-ruler",
    description:
        "Schema.org est un vocabulaire structuré collaboratif et communautaire dont la mission est de créer, maintenir et promouvoir des schémas pour les données structurées sur Internet.",
};
export default SchemaOrgMetaData;
