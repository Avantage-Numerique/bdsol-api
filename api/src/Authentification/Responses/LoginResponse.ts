/**
 * Interface to determine the structure of the response after a login call.
 */
export default interface LoginResponse {
    error: boolean,
    userConnectedToken: string|undefined;
    code: number;
    message: string;
    fields: object|null;
}