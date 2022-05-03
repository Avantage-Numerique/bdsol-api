import NotEmpty from "./NotEmpty";

export default class IsSet {

    public static verify(value:any):boolean {
        //add lenght checkup ? if yes we should limit the Rules to certain types ?
        return NotEmpty.verify(value) &&
            value !== undefined &&
            value !== null;
    }

}