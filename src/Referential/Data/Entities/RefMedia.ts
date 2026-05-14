import { RefProperty } from "../types";
import { createRefType } from "../utils";
import ArtsdataCompatibility from "@ref/Data/Compatibility/Artsdata";
import SchemaOrgCompatibility from "@ref/Data/Compatibility/SchemaOrg";
import DataSceneCompatibility from "@ref/Data/Compatibility/DataScene";
import { refType } from "@ref/Data/Properties/RefType";
import { refName } from "@ref/Data/Properties/RefName";
import { refUrl } from "@ref/Data/Properties/RefUrl";
import { refAlt } from "@ref/Data/Properties/RefAlt";
import { refDescription } from "@ref/Data/Properties/RefDescription";
import { refLicense } from "@ref/Data/Properties/RefLicense";

export const refMedia: RefProperty = {
    label: "Média",
    description: "Usage interne seulement. Référence un média dans la plateforme par son identifiant unique.",
    ontologyProperty: "avnu:Media",
    url: "/media",
    type: createRefType("object"),
    compatibility: [
        ArtsdataCompatibility.getOntologyCompatibilityArray("image", "ImageObject", "https://schema.org/ImageObject"),
        SchemaOrgCompatibility.getOntologyCompatibilityArray("ImageObject"),
        DataSceneCompatibility.getOntologyCompatibilityArray("media", "Media"),
    ],
    ref: [
        { ...refType },
        {
            ...refUrl,
            cardinality: "1..1",
        }, //contentUrl,
        { ...refName, cardinality: "0..1" },
        { ...refDescription }, //alt == description
        { ...refAlt }, //alt == alt_text
        { ...refLicense }, //contentUrl,
        //enum ImageLicenceEnum // https://schema.org/license

        //title

        //description
        //disambiguatingDescription
        //usageInfo
        //caption
        //licence //?creditText
        //fileType
        //sdDatePublished
    ],
};
