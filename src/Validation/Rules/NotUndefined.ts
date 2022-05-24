import RuleContract from "../Contracts/RuleContract";

export default class NotUndefined implements RuleContract {

    public verify(value:any):boolean {
        return value !== undefined;
    }

}