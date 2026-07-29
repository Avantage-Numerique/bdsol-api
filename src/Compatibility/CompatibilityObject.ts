import { compatibilityDBEquipmentToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgEquipment";
import { compatibilityDBEventToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgEvent";
import { compatibilityDBOrganisationToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgOrganisation";
import { compatibilityDBPersonToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgPerson";
import { compatibilityDBPlaceToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgPlace";
import { compatibilityDBProjectToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgProject";
import { compatibilityDBTaxonomyToSchemaOrg } from "./SchemaOrg/CompatSchemaOrgTaxonomy";

import { compatibilityDBEquipmentToArtsData } from "./ArtsData/CompatArtsDataEquipment";
import { compatibilityDBEventToArtsData } from "./ArtsData/CompatArtsDataEvent";
import { compatibilityDBOrganisationToArtsData } from "./ArtsData/CompatArtsDataOrganisation";
import { compatibilityDBPersonToArtsData } from "./ArtsData/CompatArtsDataPerson";
import { compatibilityDBPlaceToArtsData } from "./ArtsData/CompatArtsDataPlace";
import { compatibilityDBProjectToArtsData } from "./ArtsData/CompatArtsDataProject";
import { compatibilityDBTaxonomyToArtsData } from "./ArtsData/CompatArtsDataTaxonomy";

import { compatibilityDBEquipmentToDataScene } from "./DataScene/CompatDataSceneEquipment";
import { compatibilityDBEventToDataScene } from "./DataScene/CompatDataSceneEvent";
import { compatibilityDBOrganisationToDataScene } from "./DataScene/CompatDataSceneOrganisation";
import { compatibilityDBPersonToDataScene } from "./DataScene/CompatDataScenePerson";
import { compatibilityDBPlaceToDataScene } from "./DataScene/CompatDataScenePlace";
import { compatibilityDBProjectToDataScene } from "./DataScene/CompatDataSceneProject";
import { compatibilityDBTaxonomyToDataScene } from "./DataScene/CompatDataSceneTaxonomy";

import { CompatibleOntologiesEnum } from "./types";
import SchemaOrgMetaData from "./SchemaOrg/SchemaOrg";
import ArtsdataMetaData from "./ArtsData/Artsdata";
import DataSceneMetaData from "./DataScene/DataScene";

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
