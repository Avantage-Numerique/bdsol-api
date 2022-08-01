import {Document} from "mongoose"

export interface TaxonomySchema extends Document {
    category:string;
    name:string;
    slug:string;
    description:string;
    source:string;
}
