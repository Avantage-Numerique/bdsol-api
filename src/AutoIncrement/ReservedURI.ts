import EntityTypeFactory from "@src/Abstract/EntityTypeFactory";

export type ReservedUriType = {
    seq: number;
    entityType: string;
    targetObjectId?: string;
    targetSlug?: string;
    comment?: string;
};

const ReservedUri: ReservedUriType[] = [
    {
        seq: 5,
        entityType: EntityTypeFactory.Person,
        targetObjectId: "68c313c732da684859a24643",
        //targetSlug: "jean-guy-le-ballon-poire",
        comment: "Réservé pour Jean guy le ballon poire",
    },
    {
        seq: 7,
        entityType: EntityTypeFactory.Organisation,
        targetObjectId: "6643aa7cc8976cec81a377e5",
        //targetSlug: "petit-theatre-du-vieux-noranda",
        comment: "Réservé pour PTVN",
    },
    {
        seq: 42,
        entityType: EntityTypeFactory.Project,
        targetObjectId: "664254ddb53eedd349f9ec07",
        //targetSlug: "avantage-numerique",
        comment: "Réservé pour Avantage numérique",
    },
    {
        seq: 666,
        entityType: EntityTypeFactory.Event,
        targetObjectId: "665f5d34c15a7ff40265b8f4",
        //targetSlug: "format-de-date-2",
        comment: "Réservé pour 'format de date'",
    },
    {
        seq: 54,
        entityType: EntityTypeFactory.Equipment,
        targetObjectId: "668c1a50688c7bc31c444ff0",
        //targetSlug: "marque-marque-marque-marque-marque-modele-modele-modele-modele-modele-modele-camera-xyz",
        comment: "Réservé pour Caméra XyZ",
    },
    {
        seq: 21,
        entityType: EntityTypeFactory.Place,
        targetObjectId: "669ffdc5e154527377370cee",
        //targetSlug: "stratageme-club-d-echecs-de-rouyn-noranda",
        comment: "Réservé pour Stratagème club d'échecs",
    },
    {
        seq: 13,
        entityType: EntityTypeFactory.Taxonomy,
        targetObjectId: "664254d6b53eedd349f9e7b9",
        //targetSlug: "choregraphe",
        comment: "Réservé pour chorégraphe",
    },
];

export default ReservedUri;
