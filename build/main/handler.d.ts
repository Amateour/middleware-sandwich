import * as SW from '../../functions';
/**
 * Prepare the class to be used by routing
 *
 * @example
 * Controller function usage example
 *
 * ```ts
 * Sandwich.handler(Users, [isAuthenticated])
 * ```
 *
 * @param classRequest - Class that will serve as a pillow for routing.
 * @param middlewares - Middleware functions that run before the final function or final middleware
 * @returns
 */
declare function Handler(classRequest: SW.HandlerResource, middlewares?: SW.middlewares): SW.HandlerResponse;
export default Handler;
