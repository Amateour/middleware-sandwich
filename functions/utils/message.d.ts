/**
 * Data
 */
export interface DataError {
    message: object | string,
    errors?: any[] | string,
    statusCode?: number
}

/**
 * RespAny
 */
export type RespError = any;
//   export interface RespError {
//       message: message,
//       errors?: errors,
//       statusCode: number
//   }

 /**
 * 
 * ClassException
 */
export interface ClassException {

    /**
     * Bad request Generate error
     *
     * @param server_error - object
     */
    error: (data: DataError) => RespError;

    /**
     * Bad request Generate error
     *
     * @param server_error - object
     */
    server_error: (data: DataError) => void

    /**
     * Bad request Generate error
     *
     * @param bad_request - object
     */
    bad_request : (data: DataError) => void
}

/**
 * ClassMessage
 */
export interface ClassMessage {
    /**
     * 
     */
    response(res: any, statusCode: number, message: any): void
    /**
     * 
     */
    errors(res: any, mess: any): void,
    /**
     * 
     */
    success(res: any, mess: any): void
}