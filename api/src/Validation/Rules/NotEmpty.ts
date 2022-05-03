
export default class NotEmpty {

    public static verify(value:any):boolean {
        //add lenght checkup ? if yes we should limit the Rules to certain types ?
        return value !== "";
    }

}