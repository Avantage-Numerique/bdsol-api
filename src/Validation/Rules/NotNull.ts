import RuleContract from "../Contracts/RuleContract";

export default class NotNull implements RuleContract {

    public verify(value:any):boolean {
        return value !== null;
    }

}