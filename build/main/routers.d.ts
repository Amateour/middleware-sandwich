import { Routers as Route } from '../../functions';
/**
 *
 * @beta
 */
export declare class Routers implements Route {
    /**
     *
     */
    readonly app: Route.router;
    /**
     *
     * @param app -
     */
    constructor(app: Route.router);
    /**
     *
     * @param resource -
     */
    resource<P>(...resource: Route.ResourceArgs<P>): void;
    /**
     *
     * @param middleware -
     * @param paths -
     * @param classResource -
     */
    router(middleware: Route.middlewares, paths: Route.paths, classResource: Route.HandlerResource): void;
    /**
     *
     * @param resource -
     */
    get<P>(...resource: Route.ResourceArgs<P>): void;
}
export default Routers;
