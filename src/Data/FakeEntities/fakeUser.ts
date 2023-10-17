import type {UserContract} from "../../Users/Contracts/UserContract";

export const fakeUser:Array<UserContract> = [
{
    username: 'datageek',
    name: 'Hydile Durocher',
    email: 'datageek@test.com',
    avatar: 'https://www.pngarea.com/pngm/2/4987230_pepe-png-ez-twitch-emote-png-png-download.png',
    password: '1234',
    role: 'admin',
    verify:{ isVerified: true}
},
{
    username: 'SonofaPancak',
    name: 'Frédéric Rivard',
    email: 'epaulard21@hotmail.com',
    avatar: 'https://res.cloudinary.com/teepublic/image/private/s--W9Vj2N6H--/t_Preview/b_rgb:36538b,c_limit,f_jpg,h_630,q_90,w_630/v1523212912/production/designs/2570408_0.jpg',
    password: '12345',
    role: 'admin',
    verify:{ isVerified: true}
},
{
    username: 'Vincenzo',
    name: 'Vincent Poirier-Ruel',
    email: 'vincenzo.ruelier@gmail.fantastique',
    avatar: 'https://www.startupstreamer.com/wp-content/uploads/2020/11/efe1k7bj1mg41-1024x785.png',
    password: '12345',
    role: 'admin',
    verify:{ isVerified: true}
},
{
    username: 'mam',
    name: 'Marc-André Martin',
    email: 'marcandre@mamarmite.com',
    avatar: 'https://cdn-image.foodandwine.com/sites/default/files/201408-HD-marmite.jpg',
    password: '12345',
    role: 'admin',
    verify:{ isVerified: true}
},
{
    username: 'Simon',
    name: 'Simon Descoteaux',
    email: 'simondescoteaux@hotmail.fun',
    avatar: 'https://i.ytimg.com/vi/cMHcmReOg3c/hqdefault.jpg',
    password: '12345',
    role: 'admin',
    verify:{ isVerified: true}
},

]