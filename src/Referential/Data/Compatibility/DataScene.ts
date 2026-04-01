import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const DataSceneCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://documentation.datascene.ca/references",
    ontologyUrl: "https://documentation.datascene.ca",
    prefix: "ds",
    name: CompatibleOntologiesEnum.DataScene,
});
export default DataSceneCompatibility;
