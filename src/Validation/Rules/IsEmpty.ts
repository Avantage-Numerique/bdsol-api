import RuleContract from "../Contracts/RuleContract";

export default class IsEmpty implements RuleContract
{
    public verify(value:any):boolean {
        //add lenght checkup ? if yes we should limit the Rules to certain types ?
        return value === "" &&
            value !== undefined &&
            value !== null;
    }

}