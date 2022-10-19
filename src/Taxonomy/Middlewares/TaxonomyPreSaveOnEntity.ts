import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {Obj} from "../../Helpers/Obj";
import {TaxonomiesCategories} from "../TaxonomiesEnum";

/**
 * Add the functionnality of validating if the taxonomy added to the schema exist, is valid, and if empty, passed through.
 * @param document {any} The mongoose document
 * @param controller {any} The controller class to be able to call the getInstance() method.
 * @param taxonomyProperty {string} The parameters in the document to be able to target the field in the schema
 * @param taxonomy {string} The taxonomy that this checkups in the Taxonomy Enum.
 */
const middlewareTaxonomy = async (document:any,
                                  controller:any,
                                  taxonomyProperty:string = 'occupations',
                                  taxonomy:string = TaxonomiesCategories.Occupations) => {
    LogHelper.debug("Enter middleware");
    console.log(taxonomyProperty);
    console.log(document);

    if (document.isModified(taxonomyProperty)
        && Obj.isNotEmpty(document[taxonomyProperty]))
    {
        LogHelper.debug("MiddlewareTaxonomy : ", taxonomyProperty, document[taxonomyProperty]);
        const occupationsExist = await controller.getInstance().list({ id : document[taxonomyProperty], category: taxonomy });

        if (!occupationsExist.error) {
            const foundOccupationCount = occupationsExist.data.length;

            if (document[taxonomyProperty].length != foundOccupationCount) {
                throw(`Pre save Erreur data ${taxonomy} existe pas ou doublons`);
            }
        }
    }
}

export {middlewareTaxonomy};