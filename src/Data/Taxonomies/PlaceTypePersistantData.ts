import { TaxonomiesCategoriesEnum } from "@src/Taxonomy/TaxonomiesCategoriesEnum";
import { apiDefaultUserId } from "../ApiData";
import { MetaStates } from "@src/Moderation/Schemas/MetaSchema";

/* Got this list from https://www.wikidata.org/wiki/Wikidata:WikiProject_Cultural_venues/Typology
    which lists the most used place types
    then refined the description field with this query from https://query.wikidata.org/


    SELECT ?id ?label_en ?label ?description WHERE {
    VALUES ?id {
        wd:Q18674739 wd:Q230752 wd:Q112688641 wd:Q10547643 wd:Q2814066
        wd:Q201946 wd:Q7777493 wd:Q2310313 wd:Q17149955 wd:Q115441684
        wd:Q203847 wd:Q1360080 wd:Q57660343 wd:Q24354 wd:Q1408812
        wd:Q84860894 wd:Q153562 wd:Q1954948 wd:Q11183017 wd:Q54831
        wd:Q3469910 wd:Q56195017 wd:Q16889960 wd:Q31244 wd:Q114727401
        wd:Q1188223 wd:Q8719053 wd:Q622425 wd:Q1228895 wd:Q2399482
        wd:Q96622175 wd:Q1060829 wd:Q15206070 wd:Q50418254 wd:Q63493660
        wd:Q41253 wd:Q1454553 wd:Q2990473 wd:Q1329623 wd:Q2190251
        wd:Q77115 wd:Q1103285 wd:Q1435490 wd:Q5061188 wd:Q1378975
        wd:Q1940809 wd:Q4808723 wd:Q131183 wd:Q1298903 wd:Q1474414
        wd:Q23764314 wd:Q1076486 wd:Q483110 wd:Q1049757 wd:Q641226
        wd:Q27951514 wd:Q1763828 wd:Q117187730 wd:Q2948561 wd:Q15090615
        wd:Q1007870 wd:Q1475403 wd:Q4801243
    }
    OPTIONAL { ?id rdfs:label ?label_en FILTER (lang(?label_en) = "en") }
    OPTIONAL { ?id rdfs:label ?label FILTER (lang(?label) = "fr") }
    OPTIONAL { ?id schema:description ?description FILTER (lang(?description) = "fr") }
    }

    it selects every item from the list (each ids) and list the id, the english and french label and description if they exist

    Then I deleted some double or irrelevant data for our purpose
*/


export const PlaceTypePersistantData = [
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "lieu pour des événements",
        "description": "espace intérieur ou extérieur prévu pour accueillir des événements",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "event venue",
                    "source": "wikidata",
                    "id": "Q18674739",
                    "url": "https://www.wikidata.org/wiki/Q18674739",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        },
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "auditorium",
        "description": "lieu aménagé pour écouter un orateur ou des œuvres musicales ou théâtrales",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "auditorium",
                    "source": "wikidata",
                    "id": "Q230752",
                    "url": "https://www.wikidata.org/wiki/Q230752",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "salle de spectacle",
        "description": "salle destinée à des représentations de spectacles devant public qui comporte généralement une scène et un espace pour les spectateurs",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "performance hall",
                    "source": "wikidata",
                    "id": "Q112688641",
                    "url": "https://www.wikidata.org/wiki/Q112688641",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "comédie club",
        "description": "établissement consacré à l'humour sur scène",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "comedy club",
                    "source": "wikidata",
                    "id": "Q2814066",
                    "url": "https://www.wikidata.org/wiki/Q2814066",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "théâtre expérimental",
        "description": "salle de théâtre très basique",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "black box theater",
                    "source": "wikidata",
                    "id": "Q201946",
                    "url": "https://www.wikidata.org/wiki/Q201946",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "théâtre en rond",
        "description": "théâtre où la scène, placée au centre, est entourée de gradins où les spectateurs prennent place",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "theatre in the round",
                    "source": "wikidata",
                    "id": "Q7777493",
                    "url": "https://www.wikidata.org/wiki/Q7777493",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "théâtre flottant",
        "description": "Bateau aménagé en théâtre",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "showboat",
                    "source": "wikidata",
                    "id": "Q17149955",
                    "url": "https://www.wikidata.org/wiki/Q17149955",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "theatre premises",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "theatre premises",
                    "source": "wikidata",
                    "id": "Q115441684",
                    "url": "https://www.wikidata.org/wiki/Q115441684",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "Zimmertheater",
        "description": "terme allemand: une sous-classe d'un théâtre: dans les petits espaces est répertoriées",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "Zimmertheater",
                    "source": "wikidata",
                    "id": "Q203847",
                    "url": "https://www.wikidata.org/wiki/Q203847",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "Kellertheater",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "Kellertheater",
                    "source": "wikidata",
                    "id": "Q1360080",
                    "url": "https://www.wikidata.org/wiki/Q1360080",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "théâtre",
        "description": "édifice permettant la représentation des arts de la scène",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "theatre building",
                    "source": "wikidata",
                    "id": "Q24354",
                    "url": "https://www.wikidata.org/wiki/Q24354",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "festival theatre",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "festival theatre",
                    "source": "wikidata",
                    "id": "Q1408812",
                    "url": "https://www.wikidata.org/wiki/Q1408812",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "théâtre de marionnettes",
        "description": "Espace de création et de diffusion dédié aux arts de la marionnette",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "puppet theatre",
                    "source": "wikidata",
                    "id": "Q84860894",
                    "url": "https://www.wikidata.org/wiki/Q84860894",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "opéra",
        "description": "bâtiment où l’on joue des opéras",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "opera house",
                    "source": "wikidata",
                    "id": "Q153562",
                    "url": "https://www.wikidata.org/wiki/Q153562",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "bâtiment pour la comédie musicale",
        "description": "Type d'espace et de lieu qui accueille des comédies musicales",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "musical theater building",
                    "source": "wikidata",
                    "id": "Q1954948",
                    "url": "https://www.wikidata.org/wiki/Q1954948",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "théâtre en plein air",
        "description": "théâtre (scène) en plein air",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "open-air theatre",
                    "source": "wikidata",
                    "id": "Q11183017",
                    "url": "https://www.wikidata.org/wiki/Q11183017",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "amphithéâtre",
        "description": "salle des arts du spectacle extérieur",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "amphitheatre",
                    "source": "wikidata",
                    "id": "Q54831",
                    "url": "https://www.wikidata.org/wiki/Q54831",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "bâtiment de cirque",
        "description": "type de salle de spectacle",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "circus building",
                    "source": "wikidata",
                    "id": "Q16889960",
                    "url": "https://www.wikidata.org/wiki/Q16889960",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "chapiteau",
        "description": "grande tente destinée à accueillir les spectacles",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "big top",
                    "source": "wikidata",
                    "id": "Q31244",
                    "url": "https://www.wikidata.org/wiki/Q31244",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "lieu de danse",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "dance venue",
                    "source": "wikidata",
                    "id": "Q114727401",
                    "url": "https://www.wikidata.org/wiki/Q114727401",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "salle de concert",
        "description": "salle de spectacle destinée au déroulement de concerts",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "music venue",
                    "source": "wikidata",
                    "id": "Q8719053",
                    "url": "https://www.wikidata.org/wiki/Q8719053",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "boîte de nuit",
        "description": "espace de divertissement nocturne",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "nightclub",
                    "source": "wikidata",
                    "id": "Q622425",
                    "url": "https://www.wikidata.org/wiki/Q622425",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "discothèque",
        "description": "établissement privé musical dansant",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "discothèque",
                    "source": "wikidata",
                    "id": "Q1228895",
                    "url": "https://www.wikidata.org/wiki/Q1228895",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "club techno",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "techno club",
                    "source": "wikidata",
                    "id": "Q2399482",
                    "url": "https://www.wikidata.org/wiki/Q2399482",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "beach club",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "beach club",
                    "source": "wikidata",
                    "id": "Q96622175",
                    "url": "https://www.wikidata.org/wiki/Q96622175",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "parc de concert en plein air",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "outdoor concert venue",
                    "source": "wikidata",
                    "id": "Q50418254",
                    "url": "https://www.wikidata.org/wiki/Q50418254",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "Club de musique",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "music club",
                    "source": "wikidata",
                    "id": "Q63493660",
                    "url": "https://www.wikidata.org/wiki/Q63493660",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "salle de cinéma",
        "description": "lieu de diffusion des films pour le public",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "movie theater",
                    "source": "wikidata",
                    "id": "Q41253",
                    "url": "https://www.wikidata.org/wiki/Q41253",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "cinéma en plein air",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "outdoor cinema",
                    "source": "wikidata",
                    "id": "Q1454553",
                    "url": "https://www.wikidata.org/wiki/Q1454553",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "complexe cinématographique",
        "description": "type de lieu culturel regroupant plusieurs salles de cinéma",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "cinema complex",
                    "source": "wikidata",
                    "id": "Q2990473",
                    "url": "https://www.wikidata.org/wiki/Q2990473",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "centre culturel",
        "description": "lieu où sont organisés ou accueillis des spectacles, des expositions, des conférences, etc.",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "cultural center",
                    "source": "wikidata",
                    "id": "Q1329623",
                    "url": "https://www.wikidata.org/wiki/Q1329623",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "centre des arts",
        "description": "centre culturel dédié aux arts",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "arts center",
                    "source": "wikidata",
                    "id": "Q2190251",
                    "url": "https://www.wikidata.org/wiki/Q2190251",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "centre communautaire",
        "description": "lieu public où les membres d'une communauté ont tendance à se réunir pour des activités de groupe, le soutien social, l'information du public et autres",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "community center",
                    "source": "wikidata",
                    "id": "Q77115",
                    "url": "https://www.wikidata.org/wiki/Q77115",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "maison de club",
        "description": "bâtiment hébergeant un club privé, sportif",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "clubhouse",
                    "source": "wikidata",
                    "id": "Q1103285",
                    "url": "https://www.wikidata.org/wiki/Q1103285",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "maison du peuple",
        "description": "bâtiment destiné à servir de lieux de rencontre de la classe ouvrière ou de ses représentants",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "people's house",
                    "source": "wikidata",
                    "id": "Q1435490",
                    "url": "https://www.wikidata.org/wiki/Q1435490",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "maison de la culture",
        "description": "centre culturel piloté ou soutenu par les collectivités locales ou l'Etat",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "house of culture",
                    "source": "wikidata",
                    "id": "Q5061188",
                    "url": "https://www.wikidata.org/wiki/Q5061188",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "palais des congrès",
        "description": "lieu accueillant des salons culturels, artistiques, professionnels et politiques",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "convention center",
                    "source": "wikidata",
                    "id": "Q1378975",
                    "url": "https://www.wikidata.org/wiki/Q1378975",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "assembly hall",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "assembly hall",
                    "source": "wikidata",
                    "id": "Q1940809",
                    "url": "https://www.wikidata.org/wiki/Q1940809",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "assembly room",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "assembly room",
                    "source": "wikidata",
                    "id": "Q4808723",
                    "url": "https://www.wikidata.org/wiki/Q4808723",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "cabaret",
        "description": "établissement permettant de consommer de la nourriture et des boissons tout en regardant un spectacle",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "cabaret",
                    "source": "wikidata",
                    "id": "Q131183",
                    "url": "https://www.wikidata.org/wiki/Q131183",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "show booth",
        "description": "",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "show booth",
                    "source": "wikidata",
                    "id": "Q1298903",
                    "url": "https://www.wikidata.org/wiki/Q1298903",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "maison de radiodiffusion",
        "description": "bâtiment où sont produites des émissions de radio ou télévision",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "broadcasting house",
                    "source": "wikidata",
                    "id": "Q1474414",
                    "url": "https://www.wikidata.org/wiki/Q1474414",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "installation sportive",
        "description": "lieu dévolu à la pratique du sport",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "sports venue",
                    "source": "wikidata",
                    "id": "Q1076486",
                    "url": "https://www.wikidata.org/wiki/Q1076486",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "stade",
        "description": "terrain aménagé pour la pratique du sport",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "stadium",
                    "source": "wikidata",
                    "id": "Q483110",
                    "url": "https://www.wikidata.org/wiki/Q483110",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "stade multifonction",
        "description": "type de stade",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "multi-purpose sports venue",
                    "source": "wikidata",
                    "id": "Q1049757",
                    "url": "https://www.wikidata.org/wiki/Q1049757",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "aréna",
        "description": "stade fermé servant aux événements sportifs et artistiques",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "arena",
                    "source": "wikidata",
                    "id": "Q641226",
                    "url": "https://www.wikidata.org/wiki/Q641226",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "salle de spectacles polyvalente",
        "description": "salle des arts du spectacle pouvant servir à plusieurs arts de la scène",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "multi-purpose hall",
                    "source": "wikidata",
                    "id": "Q1763828",
                    "url": "https://www.wikidata.org/wiki/Q1763828",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "lieu pour événements en plein air",
        "description": "espace extérieur équipé pour accueillir des événements",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "open-air event venue",
                    "source": "wikidata",
                    "id": "Q117187730",
                    "url": "https://www.wikidata.org/wiki/Q117187730",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "champ de foire",
        "description": "terrain où se tient une foire",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "fair ground",
                    "source": "wikidata",
                    "id": "Q2948561",
                    "url": "https://www.wikidata.org/wiki/Q2948561",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "lieu d'exposition",
        "description": "lieu où des œuvres artistiques sont présentées",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "arts venue",
                    "source": "wikidata",
                    "id": "Q15090615",
                    "url": "https://www.wikidata.org/wiki/Q15090615",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
    {
        "category" : TaxonomiesCategoriesEnum.PlaceTypes,
        "name" : "galerie d'art",
        "description": "lieu où sont exposées des œuvres d'art",
        "meta": {
            "state": MetaStates.accepted,
            "lastModifiedBy": apiDefaultUserId,
            "provenance": [{
                    "label": "art gallery",
                    "source": "wikidata",
                    "id": "Q1007870",
                    "url": "https://www.wikidata.org/wiki/Q1007870",
                    "retrievedAt": "2025-05-02T10:00:00Z",
            }],
        }
    },
];
































































