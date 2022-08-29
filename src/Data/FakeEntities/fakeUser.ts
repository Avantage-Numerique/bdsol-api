import type {UserContract} from "../../Users/Contracts/UserContract";

export const fakeUser:Array<UserContract> = [
{
    username: 'datageek',
    name: 'Hydile Durocher',
    email: 'datageek@test.com',
    avatar: 'https://www.pngarea.com/pngm/2/4987230_pepe-png-ez-twitch-emote-png-png-download.png',
    password: '1234',
    role: 'admin'
},
{
    username: 'SonofaPancak',
    name: 'Frédéric Rivard',
    email: 'epaulard21@hotmail.com',
    avatar: 'https://res.cloudinary.com/teepublic/image/private/s--W9Vj2N6H--/t_Preview/b_rgb:36538b,c_limit,f_jpg,h_630,q_90,w_630/v1523212912/production/designs/2570408_0.jpg',
    password: '12345',
    role: 'admin'
}
]