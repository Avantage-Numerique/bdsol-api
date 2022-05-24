import RuleContract from "../Contracts/RuleContract";

export default class IsSet implements RuleContract {

    public verify(value:any):boolean {
        return value !== undefined &&
            value !== null;
    }

}