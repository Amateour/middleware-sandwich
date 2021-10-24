import * as SWCH from '../../functions';
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
    error = (data: SWCH.ErrorsRequest.Data) => {
        throw data
    }

    /**
     * Server error Generate
     *
     * @param data {object}
     */
    server_error = (data: SWCH.ErrorsRequest.Data) => {
        const {message, errors} = get_data_errors(data);
        throw {"statusCode": 500, "message": message, errors};
    }

    /**
     * Bad request Generate
     *
     * @param data {object}
     */
    bad_request = (data: SWCH.ErrorsRequest.Data) => {
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
    response(res: any, statusCode: number, message: any) {

        /**
         * stacked error information
         */
        const {stack} = message;

        /**
         * @constant response data response
         */
        const response = {
            message: message?.message,
            errors: message?.errors,
            statusCode: statusCode ?? 200,
        }
        /**
         * @constant data_send
         */
        const data_send = stack ? {...response, stack} : response;
        if (res)
            return res.status(response.statusCode)
                .json(data_send);
        Exception.error(data_send);
    }

    /**
     * send response request (error)
     * 
     * @param {object} res 
     * @param {object | string} mess 
     */
    errors(res: any, mess: any) {
        this.response(res, 500, mess)
    }

    /**
     * send response request (success)
     * 
     * @param {object} res 
     * @param {object | string} mess 
     */
    success(res: any, mess: any) {
        this.response(res, 200, mess)
    }

    /**
     * send response request (create)
     * 
     * @param {object} res 
     * @param {object | string} mess 
     */
    create(res: any, mess: any) {
      this.response(res, 201, mess)
    }
}

export const Message =  new ClassMessage();
