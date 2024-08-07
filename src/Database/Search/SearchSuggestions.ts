import Organisation from "../../Organisations/Models/Organisation";
import Person from "../../Persons/Models/Person";
import Project from "../../Projects/Models/Project";
import Taxonomy from "../../Taxonomy/Models/Taxonomy";
import Event from "@src/Events/Models/Event";
import SearchResults from "./SearchResults";

class SearchSuggestions {

    //Entities models
    public personModel:any;
    public organisationModel:any;
    public taxonomyModel:any;
    public projectModel:any;
    public eventModel:any;
    

    //Results model
    public searchResults_instance:SearchResults;
    //Singleton
    public static _instance : SearchSuggestions;
    public static getInstance(): SearchSuggestions {
        if (SearchSuggestions._instance === undefined) {
            SearchSuggestions._instance = new SearchSuggestions();
            
            SearchSuggestions._instance.personModel = Person.getInstance().mongooseModel;
            SearchSuggestions._instance.organisationModel = Organisation.getInstance().mongooseModel;
            SearchSuggestions._instance.taxonomyModel = Taxonomy.getInstance().mongooseModel;
            SearchSuggestions._instance.projectModel = Project.getInstance().mongooseModel;
            SearchSuggestions._instance.eventModel = Event.getInstance().mongooseModel;

            SearchSuggestions._instance.searchResults_instance = SearchResults.getInstance();
        }
        return SearchSuggestions._instance;
    }

    public async getTextSearchSuggestions(searchIndex:string | undefined) {
        const limit = 50;
        //To remove accent on french characters
        //req.query.searchIndex = req.query.searchIndex?.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const personsSuggestions = await this.personModel.find(
            { $or: [
                { firstName: { $regex: searchIndex, $options : 'i' }},
                { lastName: { $regex: searchIndex, $options : 'i' }},
                { nickname: { $regex: searchIndex, $options : 'i' }},
                { description: { $regex: searchIndex, $options : 'i' }},
            ]},
            null,
            { sort: { updatedAt : -1}, limit: limit}
        );

        const organisationsSuggestions = await this.organisationModel.find(
            { $or: [
                { name: { $regex: searchIndex, $options : 'i' }},
                { description: { $regex: searchIndex, $options : 'i' }},
            ]},
            null,
            { sort: { updatedAt : -1}, limit: limit}
        );

        const projectSuggestions = await this.projectModel.find(
            { $or: [
                { name: { $regex: searchIndex, $options : 'i' }},
                { alternateName: { $regex: searchIndex, $options : 'i' }},
            ]},
            null,
            { sort: { updatedAt : 1}, limit: limit}
        );

        const taxonomySuggestions = await this.taxonomyModel.find(
            { name: { $regex : searchIndex, $options : 'i' }},
            null,
            { sort: { updatedAt : 1}, limit: limit}
        );

        const eventSuggestions = await this.eventModel.find(
            { $or: [
                { name: { $regex: searchIndex, $options: 'i' }},
                { alternateName: { $regex: searchIndex, $options : 'i' }},
            ]},
            null,
            { sort: { updatedAt : 1}, limit: limit}
        )

        return [...personsSuggestions, ...organisationsSuggestions, ...projectSuggestions, ...taxonomySuggestions, ...eventSuggestions];
    }

    public async findNearTaxonomy(searchIndex:string | undefined) {
        const nearTaxonomySuggestions = await this.taxonomyModel.find(
            { name: { $regex : searchIndex, $options : 'i' }}
        );
        const nearestTaxonomy = nearTaxonomySuggestions.pop();
        if(nearestTaxonomy != undefined)
            return {nearestTaxonomy:nearestTaxonomy, otherNearbyTaxonomy:nearTaxonomySuggestions}
        return {};
    }
}

export default SearchSuggestions;