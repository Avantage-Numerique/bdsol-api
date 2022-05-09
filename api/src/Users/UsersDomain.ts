/**
 * User Domaine regroupe all the export from the domaine to avoid the Circular bug.
 * As suggested from this article by Michel Weststrade : https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de
 */

export * from './Schemas/UserSchema';
export * from './Models/User';//UserContract
export * from './Models/FakeUserModel';//UserContract


export * from './Services/UsersService';
export * from './Controllers/UserController';
export * from './Routes/UserRoutes';

export * from './fakeUsers';