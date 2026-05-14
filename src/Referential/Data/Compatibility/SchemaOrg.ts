import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const SchemaOrgCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://schema.org",
    ontologyUrl: "https://schema.org",
    prefix: "schema",
    name: CompatibleOntologiesEnum.Schemaorg,
    icon: "la-pencil-ruler",
    description:
        "Schema.org est un vocabulaire structuré collaboratif et communautaire dont la mission est de créer, maintenir et promouvoir des schémas pour les données structurées sur Internet.",
});
export default SchemaOrgCompatibility;
