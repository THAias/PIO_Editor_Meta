import { SubTree } from "../SubTree";

/**
 * Interface for backend responses due to http requests from frontend.
 * @interface
 * @property {boolean} success Success flag (true = success)
 * @property {number} errorCode Error Codes (see notes)
 * @property {string} message Success or error message
 * @property {object} data Possible data as response
 * @property {string} token Possible token for authentication
 * @description 0=unknown error, 1=no session open, 2=pio already open, 3=no pio exists
 */
export interface IResponse {
    success: boolean;
    errorCode?: number;
    message: string;
    data?: {
        [key: string]: object | object[] | string | SubTree[] | boolean;
    };
    token?: string;
}
