import * as SW from '../../functions';
/**
 *
 * @beta
 */
export declare class Routers implements SW.Routers {
    readonly app: SW.Routers.app;
    constructor(app: SW.Routers.app);
    resource(path: SW.Routers.paths, resourceClass: SW.Routers.ResourceClass, middlewares: SW.middlewares): void;
}
export default Routers;
