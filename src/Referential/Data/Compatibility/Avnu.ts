import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const AvnuCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "/ref",
    ontologyUrl: "/",
    contextUrl: "https://avnu.ca",
    prefix: "an",
    name: CompatibleOntologiesEnum.AVNU,
    label: "AVNU",
});
export default AvnuCompatibility;
