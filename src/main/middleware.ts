import * as SW from '../../functions';
import Routers from './routers';
import Validators from "./validators";
import Handler from './handler';


/**
 * Returns a class called Resource, which loads the resources. Also, after loading the necessary
 * resources for the routing job, it loads the initial configuration for the validation of the
 * arguments and parameters.
 *
 *
 * @remarks
 * The configuration of the arguments and parameters will be executed through the
 * parser_schemes function, which is a property of the Resource class.
 *
 * @example
 * examples of schemes:
 * ```json
 * {
 *   email: {type: Sandwich.String, required: true, strict: true,
 *   password: {type: Sandwich.String, required: true, strict: true, min: 8,
 * }
 * ```
 */
export class Resource implements SW.Resource {

    /**
     * Loads the data returned by the middleware, in case the promise is fulfilled.
     *
     */
    train: SW.Any;

    /**
     * http request functions
     *
     */
    request: SW.Any;

}

/**
 *
 */
class Sandwich extends Validators implements SW.SandwichClass {
    /**
     *
     */
    handler = Handler;
    /**
     *
     * @param app - 
     */
    routers = (app: SW.Routers.router) => new Routers(app);
}

export default new Sandwich();
