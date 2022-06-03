import RuleContract from "../Contracts/RuleContract";

export default class IsString implements RuleContract {

    public verify(value:any):boolean {
        return typeof value === "string";
    }

}