import * as SWCH from '../../functions';
/**
 * Class to handle exceptions
 */
export declare class ClassException implements SWCH.ClassException {
    /**
     * Server error Generate
     *
     * @param data -
     */
    error: (data: SWCH.ErrorsRequest.Data) => never;
    /**
     * Server error Generate
     *
     * @param data -
     */
    server_error: (data: SWCH.ErrorsRequest.Data) => never;
    /**
     * Bad request Generate
     *
     * @param data -
     */
    bad_request: (data: SWCH.ErrorsRequest.Data) => never;
}
export declare const Exception: ClassException;
/**
 * Classes for handling Http reply messages
 */
declare class ClassMessage implements SWCH.ClassMessage {
    /**
     * send response request
     *
     * @param res -
     * @param statusCode - number status
     * @param message - message response
     */
    response(res: any, statusCode: number, message: any): any;
    /**
     * send response request (error)
     *
     * @param res -
     * @param mess -
     */
    errors(res: any, mess: any): void;
    /**
     * send response request (success)
     *
     * @param res -
     * @param mess -
     */
    success(res: any, mess: any): void;
    /**
     * send response request (create)
     *
     * @param res -
     * @param mess -
     */
    create(res: any, mess: any): void;
}
export declare const Message: ClassMessage;
export {};
