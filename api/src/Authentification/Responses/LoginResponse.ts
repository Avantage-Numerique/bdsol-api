/**
 * Interface to determine the structure of the response after a login call.
 */
export default interface LoginResponse {
    error: boolean,
    code: number;
    errors: object|null;
    message: string;
    user: object|null;
    data: object|null;
}