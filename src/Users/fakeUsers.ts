import type {UserContract} from "./Models/User";

export const fakeUsers:Array<UserContract> = [
    {
        username: 'datageek',
        name: 'Hydile Durocher',
        email: 'datageek@test.com',
        password: '1234',
        role: 'admin'
    } as UserContract
    ,{
        username: 'annamontana',
        name: "Chantal Carpediem",
        email: 'annamontana@test.com',
        password: 'password123member',
        role: 'member'
    } as UserContract
];