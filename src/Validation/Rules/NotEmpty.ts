import RuleContract from "../Contracts/RuleContract";

export default class NotEmpty implements RuleContract {

    public verify(value:any):boolean {
        return value !== "";
    }

}