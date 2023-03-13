import { StatusStates } from "../../Moderation/Schemas/StatusSchema";

export const fakeOrganisations = [
    {
        name:"Petit Théâtre du Vieux Noranda",
        description:"Vie et magie",
        url:"https://petittheatre.org",
        contactPoint:"Rosalie Chartier-Lacombe",
        fondationDate:"2022-08-02",
        "status": {
            "state":StatusStates.accepted,
            "lastModifiedBy":"000000000000000000000000"
        }
    },
    {
        name:"Librairie Pommerleau",
        description:"Librairie de petits marchandeurs",
        url:"https://lalibrairiepommerleau.meilleur",
        contactPoint:"info@meilleurelibrairie.meilleurfois2",
        fondationDate:"2000-01-02",
        "status": {
            "state":StatusStates.accepted,
            "lastModifiedBy":"000000000000000000000000"
        }
    }
];