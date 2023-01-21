import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {TaxonomiesCategoriesEnum} from "../TaxonomiesCategoriesEnum";

/**
 * Add the functionnality of validating if the taxonomy added to the schema exist, is valid, and if empty, passed through.
 * @param idList {any} The list of id to link
 * @param controller {any} The controller class to be able to call the getInstance() method.
 * @param taxonomyProperty {string} The parameters in the document to be able to target the field in the schema
 * @param taxonomy {string} The taxonomy that this checkups in the Taxonomy Enum.
 */
const middlewareTaxonomy = async (idList:any,
                                  controller:any,
                                  taxonomyProperty:string = 'occupations',
                                  taxonomy:string = TaxonomiesCategoriesEnum.Occupations) => {
    if (idList.length != 0)
    {
        LogHelper.debug("MiddlewareTaxonomy : ", taxonomyProperty, idList);
        const occupationsExist = await controller.getInstance().list({ _id : {$in: idList}, category: taxonomy });

        if (!occupationsExist.error) {
            const foundOccupationCount = occupationsExist.data.length;

            if (idList.length != foundOccupationCount) {
                throw(`Pre save Erreur data ${taxonomy} existe pas ou doublons`);
            }
        }
    }
}

export {middlewareTaxonomy};