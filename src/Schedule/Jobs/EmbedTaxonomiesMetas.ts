//  Get all the taxonomies in the collection.
//  Determine the amount of a chunk
//  Method to call the async job by chunk and follow the promise result.
//  Loop through chunk of taxonomy.
//  done : Create an handle of the promise of each chunk.
//  done : For each taxonomy found.
//      done : get the object
//      done : execute an async search to get all the entity with this taxonmy
//      done : embed target metas in the meta property of the taxonomy document.
//          done : total Count
//          (?) : Count per entity types
//          (?) : The consultation stats ?


import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {getDbDriver} from "@database/Migrations/MigrationDbConnexion";
import SearchResults from "@database/Search/SearchResults";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import {getApiConfig} from "@src/config";

const EmbedTaxonomiesMetas = async () => {

    LogHelper.info("[Job][EmbedTaxonomiesMetas] start execution (async)");

    //  Get all the taxonomies in the collection.
    const db = getDbDriver(getApiConfig().db);
    const service = db.providers.data.services.TaxonomyService;
    const mongooseModel = Taxonomy.getInstance().mongooseModel;
    const taxonomies = await mongooseModel.find({});

    const search = SearchResults.getInstance();
    const totalTaxonomies:number = taxonomies.length;

    if (totalTaxonomies > 0) {

        const chunk:number = totalTaxonomies;
        const page:number = 1;
        const totalPages:number = totalTaxonomies / chunk;

        LogHelper.info(`[Job][EmbedTaxonomiesMetas] chunk size : ${chunk}, pages :  ${page} / ${totalPages}`);
        LogHelper.info(`[Job][EmbedTaxonomiesMetas] preparing chunking ${(page-1) * chunk}; ${(page * chunk)}`);

        //  Loop through chunk of taxonomy.
        for (let i = (page-1) * chunk; i < page * chunk; i++) {

            const taxonomy = taxonomies[i];

            if (taxonomy) {

                LogHelper.info(`[Job][EmbedTaxonomiesMetas] Searching for entities tagged with : ${taxonomy.name}`);

                // execute an async search to get all the entity with this taxonmy
                const results:any = await search.findEntityLinkedToTaxonomy(taxonomy._id);

                if (taxonomy.meta?.count !== results.length) {
                    LogHelper.info(`[Job][EmbedTaxonomiesMetas] embeding : ${results.length} in ${taxonomy.name}`);
                    // embed target metas in the meta property of the taxonomy document.
                    await service.embedCount(taxonomy, results);//          total Count
                    //Count per entity types ?
                    //          The consultation stats ?
                }
            }
        }
    }
}

export default EmbedTaxonomiesMetas;