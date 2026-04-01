import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const SchemaOrgCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://schema.org",
    ontologyUrl: "https://schema.org",
    prefix: "schema",
    name: CompatibleOntologiesEnum.Schemaorg,
});
export default SchemaOrgCompatibility;
