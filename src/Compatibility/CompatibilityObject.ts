import { compatibilityDBEquipmentToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgEquipment";
import { compatibilityDBEventToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgEvent";
import { compatibilityDBOrganisationToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgOrganisation";
import { compatibilityDBPersonToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgPerson";
import { compatibilityDBPlaceToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgPlace";
import { compatibilityDBProjectToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgProject";
import { compatibilityDBTaxonomyToSchemaOrg } from "./Data/SchemaOrg/CompatSchemaOrgTaxonomy";

import { compatibilityDBEquipmentToArtsData } from "./Data/ArtsData/CompatArtsDataEquipment";
import { compatibilityDBEventToArtsData } from "./Data/ArtsData/CompatArtsDataEvent";
import { compatibilityDBOrganisationToArtsData } from "./Data/ArtsData/CompatArtsDataOrganisation";
import { compatibilityDBPersonToArtsData } from "./Data/ArtsData/CompatArtsDataPerson";
import { compatibilityDBPlaceToArtsData } from "./Data/ArtsData/CompatArtsDataPlace";
import { compatibilityDBProjectToArtsData } from "./Data/ArtsData/CompatArtsDataProject";
import { compatibilityDBTaxonomyToArtsData } from "./Data/ArtsData/CompatArtsDataTaxonomy";

import { compatibilityDBEquipmentToDataScene } from "./Data/DataScene/CompatDataSceneEquipment";
import { compatibilityDBEventToDataScene } from "./Data/DataScene/CompatDataSceneEvent";
import { compatibilityDBOrganisationToDataScene } from "./Data/DataScene/CompatDataSceneOrganisation";
import { compatibilityDBPersonToDataScene } from "./Data/DataScene/CompatDataScenePerson";
import { compatibilityDBPlaceToDataScene } from "./Data/DataScene/CompatDataScenePlace";
import { compatibilityDBProjectToDataScene } from "./Data/DataScene/CompatDataSceneProject";
import { compatibilityDBTaxonomyToDataScene } from "./Data/DataScene/CompatDataSceneTaxonomy";

import { CompatibleOntologiesEnum } from "./types";
import SchemaOrgMetaData from "./Data/SchemaOrg/SchemaOrg";
import ArtsdataMetaData from "./Data/ArtsData/Artsdata";
import DataSceneMetaData from "./Data/DataScene/DataScene";

export const compatibilityData = {
    [CompatibleOntologiesEnum.Schemaorg]: {
        ...compatibilityDBEquipmentToSchemaOrg,
        ...compatibilityDBEventToSchemaOrg,
        ...compatibilityDBOrganisationToSchemaOrg,
        ...compatibilityDBPersonToSchemaOrg,
        ...compatibilityDBPlaceToSchemaOrg,
        ...compatibilityDBProjectToSchemaOrg,
        ...compatibilityDBTaxonomyToSchemaOrg,
    },

    [CompatibleOntologiesEnum.Artsdata]: {
        ...compatibilityDBEquipmentToArtsData,
        ...compatibilityDBEventToArtsData,
        ...compatibilityDBOrganisationToArtsData,
        ...compatibilityDBPersonToArtsData,
        ...compatibilityDBPlaceToArtsData,
        ...compatibilityDBProjectToArtsData,
        ...compatibilityDBTaxonomyToArtsData,
    },

    [CompatibleOntologiesEnum.DataScene]: {
        ...compatibilityDBEquipmentToDataScene,
        ...compatibilityDBEventToDataScene,
        ...compatibilityDBOrganisationToDataScene,
        ...compatibilityDBPersonToDataScene,
        ...compatibilityDBPlaceToDataScene,
        ...compatibilityDBProjectToDataScene,
        ...compatibilityDBTaxonomyToDataScene,
    },
};

export const ontologiesMetaData = {
    [CompatibleOntologiesEnum.Schemaorg]: SchemaOrgMetaData,
    [CompatibleOntologiesEnum.Artsdata]: ArtsdataMetaData,
    [CompatibleOntologiesEnum.DataScene]: DataSceneMetaData,
};
