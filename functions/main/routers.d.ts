import {middlewares as Middlewares} from "../utils/typeUtil";
import {HandlerResource as handlerResource} from './middleware';

declare namespace Routers {
    type HandlerResource = handlerResource
    /**
     *
     */
    type middlewares = Middlewares | undefined;
    /**
     *
     */
    type router = any;
    /**
     *
     */
    type paths = string | string[];
    /**
     *
     */
    interface props {
        req: any,
        resp: any,
        pathName?: string,
    }
    /**
     *
     */
    interface ResourceClass {
        get(req: any, res: any): void;
        post(req: any, res: any): void;
        put(req: any, res: any): void;
        delete(req: any, res: any): void;
        one(req: any, res: any): void;
        stag(req: any, res: any): void;
        patch(req: any, res: any): void;
    }
    /**
     *
     */
    type args<Params> = Params;
    /**
     *
     */
    type PathsResource = [paths: paths, resourceClass: HandlerResource];
    /**
     *
     */
    type MiddlewareResource = [middleware: middlewares, paths: paths, resourceClass: HandlerResource];
    /**
     *
     */
    type optionsParam = PathsResource | MiddlewareResource;
    /**
     *
     */
    type ResourceArgs<Param> = Param extends optionsParam ?
        Param: Params<Param>;
    /**
     *
     */
    type Params<P> = P extends optionsParam ? optionsParam: P[];
}
/**
 *
 */
export class Routers extends Routers.ResourceClass{
    /**
     *
     */
    readonly app: Routers.router;
    /**
     *
     * @param app -
     */
    constructor(app: Routers.router): void;
    /**
     *
     * @param resource -
     */
    resource<P>(...resource: Routers.ResourceArgs<P>): void;
}
