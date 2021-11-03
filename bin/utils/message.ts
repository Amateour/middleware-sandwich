import * as SWCH from '../../functions';
/**
 * get data error
 *
 * @param data - `{
 *     message: message of error "bad request",
 *     errors: data errors
 * }`
 */
const get_data_errors: SWCH.get_data_errors = (data) => {
    return data
}

/**
 * Class to handle exceptions
 */
export class ClassException implements SWCH.ClassException {

    /**
     * Server error Generate
     *
     * @param data - 
     */
    error = (data: SWCH.ErrorsRequest.Data) => {
        throw data
    }

    /**
     * Server error Generate
     *
     * @param data - 
     */
    server_error = (data: SWCH.ErrorsRequest.Data) => {
        const {message, errors} = get_data_errors(data);
        throw {"statusCode": 500, "message": message, errors};
    }

    /**
     * Bad request Generate
     *
     * @param data - 
     */
    bad_request = (data: SWCH.ErrorsRequest.Data) => {
        const {message, errors} = get_data_errors(data);
        throw {"statusCode": 400, "message": message, errors};
    }

}

export const Exception = new ClassException();


/**
 * Classes for handling Http reply messages
 */
class ClassMessage implements SWCH.ClassMessage {

    /**
     * send response request
     * 
     * @param res - 
     * @param statusCode - number status
     * @param message - message response
     */
    response(res: any, statusCode: number, message: any) {

        /**
         * stacked error information
         */
        const {stack} = message;

        /**
         * data response
         */
        const response = {
            message: message?.message,
            errors: message?.errors,
            statusCode: statusCode ?? 200,
        }
        /**
         *
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
     * @param res -
     * @param mess -
     */
    errors(res: any, mess: any) {
        this.response(res, 500, mess)
    }

    /**
     * send response request (success)
     * 
     * @param res -
     * @param mess -
     */
    success(res: any, mess: any) {
        this.response(res, 200, mess)
    }

    /**
     * send response request (create)
     * 
     * @param res -
     * @param mess -
     */
    create(res: any, mess: any) {
      this.response(res, 201, mess)
    }
}

export const Message =  new ClassMessage();
