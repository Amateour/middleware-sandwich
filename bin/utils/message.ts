import * as SWCH from '../functions';
/**
 * get data error
 *
 * @param data {object} {
 *     message: message of error "bad request",
 *     errors: data errors
 * }
 * @const
 */
const get_data_errors: SWCH.get_data_errors = (data) => {
    return data
}

/**
 * @class ClassException
 */
export class ClassException implements SWCH.ClassException {
    /**
     * Server error Generate
     *
     * @param data {object}
     */
    server_error = (data) => {
        const {message, errors} = get_data_errors(data);
        throw {"statusCode": 500, "message": message, errors};
    }

    /**
     * Bad request Generate
     *
     * @param data {object}
     */
    bad_request = (data) => {
        const {message, errors} = get_data_errors(data);
        throw {"statusCode": 400, "message": message, errors};
    }

}

export const Exception = new ClassException();


/**
 * @class ClassMessage
 */
class ClassMessage implements SWCH.ClassMessage {

    /**
     * send response request
     * 
     * @param {object} res 
     * @param {number} statusCode number status
     * @param {object | string} message message response
     */
    response = (res, statusCode, message) => {

        /**
         * stacked error information
         */
        const {stack} = message;

        /**
         * @constant response data response
         */
        const response = {
            message: message?.message
        }
 
        res.status(statusCode ?? 200)
            .json(stack ? {...response, stack} : response);
    }

    /**
     * send response request (error)
     * 
     * @param {object} res 
     * @param {object | string} mess 
     */
    errors = (res, mess) => {
        this.response(res, 500, mess)
    }

    /**
     * send response request (success)
     * 
     * @param {object} res 
     * @param {object | string} mess 
     */
    success = (res, mess) => {
        this.response(res, 200, mess)
    }

    /**
     * send response request (create)
     * 
     * @param {object} res 
     * @param {object | string} mess 
     */
    create = (res, mess) => {
      this.response(res, 201, mess)
    }
}

export const Message =  new ClassMessage();
