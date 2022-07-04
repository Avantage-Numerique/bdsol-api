import {Document} from "mongoose"

export interface TaxonomySchema extends Document {
    name:string;
    description:string;
    subTaxonomy:string //Pour le moment string, à changer pour []Id
}
