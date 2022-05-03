import NotEmpty from "./NotEmpty";
import RuleContract from "../Contracts/RuleContract";

export default class IsSet implements RuleContract {

    public verify(value:any):boolean {
        return NotEmpty.verify(value) &&
            value !== undefined &&
            value !== null;
    }

}