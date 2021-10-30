import * as SWCH from '../../functions';
/**
 * @class ClassException
 */
export declare class ClassException implements SWCH.ClassException {
    /**
     * Server error Generate
     *
     * @param data {object}
     */
    error: (data: SWCH.ErrorsRequest.Data) => never;
    /**
     * Server error Generate
     *
     * @param data {object}
     */
    server_error: (data: SWCH.ErrorsRequest.Data) => never;
    /**
     * Bad request Generate
     *
     * @param data {object}
     */
    bad_request: (data: SWCH.ErrorsRequest.Data) => never;
}
export declare const Exception: ClassException;
/**
 * @class ClassMessage
 */
declare class ClassMessage implements SWCH.ClassMessage {
    /**
     * send response request
     *
     * @param {object} res
     * @param {number} statusCode number status
     * @param {object | string} message message response
     */
    response(res: any, statusCode: number, message: any): any;
    /**
     * send response request (error)
     *
     * @param {object} res
     * @param {object | string} mess
     */
    errors(res: any, mess: any): void;
    /**
     * send response request (success)
     *
     * @param {object} res
     * @param {object | string} mess
     */
    success(res: any, mess: any): void;
    /**
     * send response request (create)
     *
     * @param {object} res
     * @param {object | string} mess
     */
    create(res: any, mess: any): void;
}
export declare const Message: ClassMessage;
export {};
