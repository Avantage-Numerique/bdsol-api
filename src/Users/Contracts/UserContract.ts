export interface UserContract {
    username:string;
    email:string;
    password:string;
    avatar:string;
    name:string;
    firstName?:string;
    lastName?:string;
    role: string;
    tos: object;
    verify: object;
    changePassword:object;
}