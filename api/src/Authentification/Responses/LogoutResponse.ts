/**
 * Interface to determine the logout response structure when the logout endpoint is called.
 */
export interface LogoutResponse {
    error: boolean;
    user: string|undefined;
    code: number;
    errors: object|null;
    message: string;
    data: object|null;
}