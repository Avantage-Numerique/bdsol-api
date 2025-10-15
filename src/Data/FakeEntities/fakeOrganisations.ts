import { MetaStates } from "../../Moderation/Schemas/MetaSchema";

export const fakeOrganisations = [
    {
        name: "Petit Théâtre du Vieux Noranda",
        description: "Vie et magie",
        url: [{ url: "https://petittheatre.org" }],
        contactPoint: { email: "Rosalie.Chartier-Lacombe@ptvn.org" },
        fondationDate: "2022-08-02",
        meta: {
            state: MetaStates.accepted,
            lastModifiedBy: "000000000000000000000000",
        },
    },
    {
        name: "Librairie Pommerleau",
        description: "Librairie de petits marchandeurs",
        url: [{ url: "https://lalibrairiepommerleau.meilleur" }],
        contactPoint: { email: "info@meilleurelibrairie.meilleurfois2" },
        fondationDate: "2000-01-02",
        meta: {
            state: MetaStates.accepted,
            lastModifiedBy: "000000000000000000000000",
        },
    },
];
