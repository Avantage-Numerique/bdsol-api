import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const DataSceneCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://documentation.datascene.ca/references",
    ontologyUrl: "https://documentation.datascene.ca",
    prefix: "ds",
    name: CompatibleOntologiesEnum.DataScene,
    icon: "la-lightbulb",
    description:
        "Des données standardisées pour un écosystème des arts de la scène connecté et performant. Moins de ressaisies. Plus de cohérence. Une information qui voyage mieux.",
});
export default DataSceneCompatibility;
