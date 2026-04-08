import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const ArtsdataCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://docs.artsdata.ca",
    ontologyUrl: "https://kg.artsdata.ca",
    prefix: "adr",
    //name: "Artsdata",
    name: CompatibleOntologiesEnum.Artsdata,
});
export default ArtsdataCompatibility;
