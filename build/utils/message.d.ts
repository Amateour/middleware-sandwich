import * as SW from '../../functions';
/**
 * Class to handle exceptions
 */
export declare class ClassException implements SW.ClassException {
    /**
     * Server error Generate
     *
     */
    error: (data: SW.DataError) => void;
    /**
     * Server error Generate
     *
     * @param data -
     */
    server_error: (data: SW.DataError) => void;
    /**
     * Bad request Generate
     *
     * @param data -
     */
    bad_request: (data: SW.DataError) => void;
}
export declare const Exception: ClassException;
/**
 * Classes for handling Http reply messages
 */
declare class ClassMessage implements SW.ClassMessage {
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
