/**
 * Contract to be able to authenticate the target user.
 */
export default interface UserAuthContract {
    username: string | null;
    password: string | null;
}