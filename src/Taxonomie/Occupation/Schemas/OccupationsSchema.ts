import {Document} from "mongoose"

export interface OccupationSchema extends Document {
    nom:string;
    description:string;
    category:string
    sousTaxonomie:string //Pour le moment string, à changer pour []Id
}
