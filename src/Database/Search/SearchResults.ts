import mongoose from "mongoose";
import Organisation from "../../Organisations/Models/Organisation";
import Person from "../../Persons/Models/Person";
import Project from "../../Projects/Models/Project";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";


class SearchResults {

    //Entities models
    public personModel:any;
    public organisationModel:any;
    public taxonomyModel:any;
    public projectModel:any;

    //Singleton
    public static _instance : SearchResults;
    public static getInstance(): SearchResults {
        if (SearchResults._instance === undefined) {
            SearchResults._instance = new SearchResults();
            
            SearchResults._instance.personModel = Person.getInstance().mongooseModel;
            SearchResults._instance.organisationModel = Organisation.getInstance().mongooseModel;
            SearchResults._instance.taxonomyModel = Taxonomy.getInstance().mongooseModel;
            SearchResults._instance.projectModel = Project.getInstance().mongooseModel;
        }
        return SearchResults._instance;
    }


    public async getTextSearchResult(searchIndex:string | undefined) {
        //Send out $text : { $search : req.query } to all entity
        const promises = [];
        promises.push(
            await this.personModel.find(
                {$text: {$search: searchIndex}},
                {score: {$meta: "textScore"}}
            ));
        promises.push(
            await this.organisationModel.find(
                {$text: {$search: searchIndex}},
                {score: {$meta: "textScore"}}
            ));
        promises.push(
            await this.projectModel.find(
                {$text: {$search: searchIndex}},
                {score: {$meta: "textScore"}}
            ));
        
        promises.push(
            await this.taxonomyModel.find(
                {$text: {$search: searchIndex}},
                {score: {$meta: "textScore"}}
            ));


        let textSearchResultArray;
        if(promises.length > 0){
            textSearchResultArray = promises.flat().map( (el) => {
                return JSON.stringify(el.toJSON());
            }).map( (str) => {
                return JSON.parse(str);
            });
            //Would love to merge sort the results :) but this more easy V
            textSearchResultArray.sort( function(a,b) { return b.score - a.score });
        }

        return textSearchResultArray;
    }

    public async getLinkedEntitiesToTaxonomyByCatAndSlug(category:string, slug:string):Promise<any> {

        const taxonomy = await this.taxonomyModel.find(
            {
                category: category,
                slug: slug
            }
        );
        if (taxonomy.length > 0) {
            //const taxonomyId = taxonomyModel?.shift()?._id;
            const taxonomyId = taxonomy[0]._id;

            if (taxonomyId) {
                const linkedEntities:Array<any> = await this.findEntityLinkedToTaxonomy(taxonomyId);
                await this._embedEntitiesCountInTaxonomy(taxonomy[0], linkedEntities);
                return linkedEntities;
            }
        }
        return {}
    }

    
    public async findEntityLinkedToTaxonomy(taxonomyId:string){
        if (mongoose.isObjectIdOrHexString(taxonomyId)) {
            const paramId = new mongoose.Types.ObjectId(taxonomyId);
            const promises = [];
            promises.push(
                await this.personModel.find(
                    {
                        $or: [
                            {"occupations.skills": paramId},
                            {"domains.domain": paramId},
                        ]
                    }
                ));
            promises.push(
                await this.organisationModel.find(
                    {
                        $or: [
                            {"offers.skills": paramId},
                            {"domains.domain": paramId},
                        ]
                    }
                ));
            promises.push(
                await this.projectModel.find(
                    { "skills": paramId }
                )
            )

            let tagSearchResult = [];
            if(promises.length > 0) {
                    tagSearchResult = promises.flat();
            }
            return tagSearchResult;
        }
        return [];
    }


    private async _embedEntitiesCountInTaxonomy(document:any, results:Array<any>) {
        try {
            const currentCount:Number = results.length;
            document.meta = {
                count: currentCount
            }
            await document.save();
            LogHelper.info(`[Embedding] Taxonomy entities count ${currentCount} assign with ${document.name} taxonomy`);

        } catch(e:any) {
            throw new Error(e);
        }
    }
}

export default SearchResults;