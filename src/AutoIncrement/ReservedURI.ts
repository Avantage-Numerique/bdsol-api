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
        targetSlug: "",
        comment: "Réservé pour Jean guy le ballon poire",
    },
    {
        seq: 7,
        entityType: EntityTypeFactory.Organisation,
        targetObjectId: "6643aa7cc8976cec81a377e5",
        targetSlug: "",
        comment: "Réservé pour PTVN",
    },
    {
        seq: 666,
        entityType: EntityTypeFactory.Person,
        targetObjectId: "664254ddb53eedd349f9ebfe",
        targetSlug: "",
        comment: "Réservé pour Jeanne mais c'est Hugo là",
    },
];

export default ReservedUri;
