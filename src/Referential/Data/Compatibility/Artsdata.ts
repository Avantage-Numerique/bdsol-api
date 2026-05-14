import CompatibleOntology, { CompatibleOntologiesEnum } from "@ref/Data/Compatibility/CompatibleOntology";

const ArtsdataCompatibility: CompatibleOntology = new CompatibleOntology({
    referentialUrl: "https://docs.artsdata.ca",
    ontologyUrl: "https://kg.artsdata.ca",
    prefix: "adr",
    name: CompatibleOntologiesEnum.Artsdata,
    icon: "la-palette",
    description:
        "Artsdata est un graphe de connaissances interrelié avec de nombreuses sources de données du secteur des arts ainsi\n" +
        "    qu’avec d’autres bases de connaissances ouvertes et liées. Cette infrastructure facilite la découvrabilité et la\n" +
        "    réutilisation des données sur les arts.",
});
export default ArtsdataCompatibility;
