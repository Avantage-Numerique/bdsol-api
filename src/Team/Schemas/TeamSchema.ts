import {Member} from "./MemberSchema";
import {Schema} from "mongoose";


export const TeamField:{ type: [Schema], ref: string } = {
    type: [Member.schema],
    ref: "Person"
}