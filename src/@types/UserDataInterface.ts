/**
 * Interface for the user data
 * @interface
 * @property {string} firstName First name of the user
 * @property {string} lastName Last name of the user
 * @property {string} fingerPrint Unique uuid for the user (just used in webVersion)
 */
export interface IUserData {
    firstName: string;
    lastName: string;
    fingerPrint?: string;
}
