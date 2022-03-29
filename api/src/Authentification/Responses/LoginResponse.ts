/**
 * Interface to determine the structure of the response after a login call.
 */
export default interface LoginResponse {
    userConnectedToken: string|undefined;
    code: number;
    message: string;
    fields: object|null;
}