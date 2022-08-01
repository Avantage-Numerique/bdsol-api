/**
 * Interface to determine the structure of the response after a login call.
 */
export default interface LoginResponse {
    error: boolean,
    code: number;
    errors: object|null;
    message: string;
    data: object|null;
}