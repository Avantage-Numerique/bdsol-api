/**
 * Interface to determine the logout response structure when the logout endpoint is called.
 */
export interface LogoutResponse {
    error: boolean;
    code: number;
    errors: object|null;
    message: string;
    data: any|null;
}