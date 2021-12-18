import * as SW from '../../functions';

/**
 * get data error
 *
 * @param data -
 * ```json
 * {
 *     message: message of error "bad request",
 *     errors: data errors
 * }
 * ```
 */
function getDataErrors(data: SW.DataError): SW.DataError {
    return data
}

/**
 * Server error Generate
 *
 * @param data -
 */
const error = (data: SW.DataError): void => {
    throw data
}

/**
 * Class to handle exceptions
 */
export class ClassException implements SW.ClassException {

    /**
     * Server error Generate
     *
     */
    error = error

    /**
     * Server error Generate
     *
     * @param data - 
     */
    server_error = (data: SW.DataError): void => {
        const {message, errors} = getDataErrors(data);
        error({"statusCode": 500, "message": message, errors});
    }

    /**
     * Bad request Generate
     *
     * @param data - 
     */
    bad_request = (data: SW.DataError) => {
        const {message, errors} = getDataErrors(data);
        error({"statusCode": 400, "message": message, errors});
    }

}

export const Exception = new ClassException();


/**
 * Classes for handling Http reply messages
 */
class ClassMessage implements SW.ClassMessage {

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
        if(!res) throw data_send;
        if (res)
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data_send));
            return res.end();
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
