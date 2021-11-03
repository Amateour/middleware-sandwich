import {ErrorsRequest} from "../type";

/**
 * get data error
 *
 * @param data - {object} `{
 *     message: message of error "bad request",
 *     errors: data errors
 * }`
 * 
 */
 export type get_data_errors = (data: ErrorsRequest.Data) => ErrorsRequest.Data

 /**
 * 
 * ClassException
 */
export interface ClassException {

    /**
     * Bad request Generate error
     *
     * @param server_error - {object}
     */
    error: (data: ErrorsRequest.Data) => ErrorsRequest.RespAny;

    /**
     * Bad request Generate error
     *
     * @param server_error - {object}
     */
    server_error: (data: ErrorsRequest.Data) => ErrorsRequest.RespError

    /**
     * Bad request Generate error
     *
     * @param bad_request - {object}
     */
    bad_request : (data: ErrorsRequest.Data) => ErrorsRequest.RespError
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