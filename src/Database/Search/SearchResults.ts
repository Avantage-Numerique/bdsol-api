import mongoose from "mongoose";
import Organisation from "../../Organisations/Models/Organisation";
import Person from "../../Persons/Models/Person";
import Project from "../../Projects/Models/Project";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import Event from "@src/Events/Models/Event";
import Equipment from "@src/Equipment/Models/Equipment";
import EntityControllerFactory from "@src/Abstract/EntityControllerFactory";
import { ErrorResponse } from "@src/Http/Responses/ErrorResponse";
import { StatusCodes } from "http-status-codes";


class SearchResults {

    //Entities models
    public personModel:any;
    public organisationModel:any;
    public taxonomyModel:any;
    public projectModel:any;
    public eventModel:any;
    public equipmentModel:any;

    //Singleton
    public static _instance : SearchResults;
    public static getInstance(): SearchResults {
        if (SearchResults._instance === undefined) {
            SearchResults._instance = new SearchResults();
            
            SearchResults._instance.personModel = Person.getInstance().mongooseModel;
            SearchResults._instance.organisationModel = Organisation.getInstance().mongooseModel;
            SearchResults._instance.taxonomyModel = Taxonomy.getInstance().mongooseModel;
            SearchResults._instance.projectModel = Project.getInstance().mongooseModel;
            SearchResults._instance.eventModel = Event.getInstance().mongooseModel;
            SearchResults._instance.equipmentModel = Equipment.getInstance().mongooseModel;
        }
        return SearchResults._instance;
    }

    public async fetchHomePageEntity(){
        const homePageEntity = [];
        homePageEntity.push(await this.personModel.findOne({}, {}, { sort : { updatedAt: -1 } }));
        homePageEntity.push(await this.organisationModel.findOne({}, {}, { sort : { updatedAt: -1 } }));
        //Commented because taxonomy doesn't have a simple component in frontend
        //homePageEntity.push(await this.taxonomyModel.findOne({}, {}, { sort : { updatedAt: -1 } }));
        homePageEntity.push(await this.projectModel.findOne({}, {}, { sort : { updatedAt: -1 } }));
        homePageEntity.push(await this.eventModel.findOne({}, {}, { sort : { updatedAt: -1 } }));
        homePageEntity.push(await this.equipmentModel.findOne({}, {}, { sort : { updatedAt: -1 } }));

        //fetch a 6th entity for frontend (atm always the second last person modified)
        homePageEntity.push(await this.personModel.findOne({}, {}, { sort : { updatedAt: -1 }, skip:1 }));
        return homePageEntity;
    }

    public async searchByTypeAndCategory(type:string, skip:number, limit:number){//, categories:any){
        const controller = EntityControllerFactory.getControllerFromEntity(type);
        if(controller !== undefined){
            const result = await controller.list({skip:skip, limit:limit, sort:"desc"})
            return result;
        }
        return ErrorResponse.create(new Error("Type doesn't exist"), StatusCodes.BAD_REQUEST, "Type doesn't exist");
    }

    //For pagination, acts as a 
    public async countByType(type:string){
        const controller = EntityControllerFactory.getControllerFromEntity(type);
        if(controller !== undefined){
            const count = await controller.count({});
            return count;
        }
        return ErrorResponse.create(new Error("Type doesn't exist"), StatusCodes.BAD_REQUEST, "Type doesn't exist");
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
        
        promises.push(
            await this.eventModel.find(
                {$text: {$search: searchIndex}},
                {score: {$meta: "textScore"}}
            ));
        promises.push(
            await this.equipmentModel.find(
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

            promises.push(
                await this.eventModel.find(
                    {
                        $or: [
                            {"skills": paramId},
                            {"domains.domain": paramId},
                            {"eventType": paramId}
                        ]
                    }
                )
            )
            promises.push(
                await this.equipmentModel.find(
                    { equipmentType: paramId }
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
            const currentCount:number = results.length;
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