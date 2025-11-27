type RefItem = { label: string; url: string; ref: Ref[] };

type Ref = { name: string; format: string; description?: string; compatibility?: Record<string, [string, string]> };

type RefData = { primary: Record<string, RefItem>; secondary: Record<string, RefItem> };

export const refData: RefData = {
    primary: {
        person: {
            label: "Personne",
            url: "/person",

            ref: [
                {
                    name: "nom",
                    format: "string",
                    description: "blablabla...",

                    compatibility: {
                        schemaorg: ["name", "schema.org/url"],
                        artsDeLaScene: ["Nom", "artsdelascene.com/nom"],
                    },
                },

                {
                    name: "prenom",
                    format: "string",
                },

                {
                    name: "contactPoint",
                    format: "string",
                },
            ],
        },

        organisation: {
            label: "Organisation",
            url: "/organisation",

            ref: [],
        },

        place: {
            label: "Place",
            url: "/place",

            ref: [
                {
                    name: "address",
                    format: "Address",
                },
            ],
        },
    },

    secondary: {
        address: {
            label: "Adresse",
            url: "/address",

            ref: [
                {
                    name: "rue",
                    format: "string",
                },
            ],
        },
    },
};
