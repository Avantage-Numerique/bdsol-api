/**
 * Contract to be able to authenticate the target user.
 */
export default interface UserAuthContract {
    user: string | null;
    password: string | null;
}