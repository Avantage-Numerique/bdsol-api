import CompatibleOntology from "@ref/Data/Compatibility/CompatibleOntology";

const ArtsdataCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://docs.artsdata.ca",
    ontologyUrl: "https://kg.artsdata.ca",
    prefix: "adr",
    name: "Artsdata",
});
export default ArtsdataCompatibility;
