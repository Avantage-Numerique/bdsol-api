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
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

export const compatibilityData = {
    [CompatibleOntologiesEnum.Schemaorg]: {
        [EntityTypesEnum.equipment]: compatibilityDBEquipmentToSchemaOrg,
        [EntityTypesEnum.event]: compatibilityDBEventToSchemaOrg,
        [EntityTypesEnum.organisation]: compatibilityDBOrganisationToSchemaOrg,
        [EntityTypesEnum.person]: compatibilityDBPersonToSchemaOrg,
        [EntityTypesEnum.place]: compatibilityDBPlaceToSchemaOrg,
        [EntityTypesEnum.project]: compatibilityDBProjectToSchemaOrg,
        [EntityTypesEnum.taxonomy]: compatibilityDBTaxonomyToSchemaOrg,
    },

    [CompatibleOntologiesEnum.Artsdata]: {
        [EntityTypesEnum.equipment]: compatibilityDBEquipmentToArtsData,
        [EntityTypesEnum.event]: compatibilityDBEventToArtsData,
        [EntityTypesEnum.organisation]: compatibilityDBOrganisationToArtsData,
        [EntityTypesEnum.person]: compatibilityDBPersonToArtsData,
        [EntityTypesEnum.place]: compatibilityDBPlaceToArtsData,
        [EntityTypesEnum.project]: compatibilityDBProjectToArtsData,
        [EntityTypesEnum.taxonomy]: compatibilityDBTaxonomyToArtsData,
    },

    [CompatibleOntologiesEnum.DataScene]: {
        [EntityTypesEnum.equipment]: compatibilityDBEquipmentToDataScene,
        [EntityTypesEnum.event]: compatibilityDBEventToDataScene,
        [EntityTypesEnum.organisation]: compatibilityDBOrganisationToDataScene,
        [EntityTypesEnum.person]: compatibilityDBPersonToDataScene,
        [EntityTypesEnum.place]: compatibilityDBPlaceToDataScene,
        [EntityTypesEnum.project]: compatibilityDBProjectToDataScene,
        [EntityTypesEnum.taxonomy]: compatibilityDBTaxonomyToDataScene,
    },
};
