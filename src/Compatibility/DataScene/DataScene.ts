import { CompatibleOntologiesEnum, OntologyMetaData } from "../types";

const DataSceneMetaData: OntologyMetaData = {
    referentialUrl: "https://documentation.datascene.ca/references",
    ontologyUrl: "https://documentation.datascene.ca",
    contextUrl: "https://documentation.datascene.ca",
    prefix: "ds",
    name: CompatibleOntologiesEnum.DataScene,
    label: "Data scène",
    icon: "la-lightbulb",
    description:
        "Des données standardisées pour un écosystème des arts de la scène connecté et performant. Moins de ressaisies. Plus de cohérence. Une information qui voyage mieux.",
};
export default DataSceneMetaData;
