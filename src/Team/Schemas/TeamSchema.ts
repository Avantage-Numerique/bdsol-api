import {Member} from "./MemberSchema";
import {Schema} from "mongoose";


export const TeamField:{ type: [Schema] } = {
    type: [Member.schema]
}