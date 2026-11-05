import { RefSchema } from "@ref/Data/types";
import { createRefType } from "@ref/Data/utils";
import { refType } from "@ref/Data/Properties/RefType";
import { licenceList } from "@src/Media/List/LicenceList";
import { fileExtensionList, fileTypeList } from "@src/Media/List/FileList";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";
import { refMeta } from "../SubSchema/RefMeta";

export const refMedia: RefSchema = {
    type: createRefType("object"),
    fields: {
        type: refType,
        title: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        alt: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        description: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        path: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        url: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        licence: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: Object.fromEntries(licenceList.map((v) => [v, v])) },
        },
        fileType: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: Object.fromEntries(fileTypeList.map((v) => [v, v])) },
        },
        fileName: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        extension: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: Object.fromEntries(fileExtensionList.map((v) => [v, v])) },
        },
        mediaField: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: { enum: { mainImage: "mainImage", photogallery: "photoGallery" } },
        },
        slug: {
            cardinality: "0..1",
            type: createRefType("string"),
        },
        entityId: {
            cardinality: "0..1",
            type: createRefType(
                "reference",
                Object.values(EntityTypesEnum).filter((type) => type !== EntityTypesEnum.media)
            ),
        },
        entityType: {
            cardinality: "0..1",
            type: createRefType("reference", Object.values(EntityTypesEnum)),
            constraints: { required: true },
        },
        uploadedBy: {
            cardinality: "0..1",
            type: createRefType("reference", []),
        },
        dbStatus: {
            cardinality: "0..1",
            type: createRefType("string"),
            constraints: {
                enum: {
                    "in use": "in use",
                    archived: "archived",
                    "to delete": "to delete",
                    pending: "pending",
                },
            },
        },
        meta: {
            cardinality: "0..1",
            type: createRefType("object"),
            fields: refMeta.fields,
        },
    },
};
