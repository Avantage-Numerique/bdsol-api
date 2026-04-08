import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const AvnuCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "/ref",
    ontologyUrl: "/",
    prefix: "an",
    name: CompatibleOntologiesEnum.AVNU,
});
export default AvnuCompatibility;
