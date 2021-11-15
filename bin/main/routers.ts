import {Routers as Route} from '../../functions';
import {isArray} from "../utils/help";

/*
const METHODS_PARAMS = {
    get: 'one',
    put: 'put',
    post: 'stag',
    delete: 'delete',
    patch: 'patch'
}

const METHODS = {
    get: 'get',
    post: 'post',
}*/

/**
 *
 * @param classResource -
 * @param middleware -
 */
const handlerResource = (classResource: Route.HandlerResource, middleware: Route.middlewares) => {
    return () => {
        return {classResource, middleware}
    }
}
/**
 *
 * @param resource -
 */
const getParams = <P>(...resource:Route.ResourceArgs<P>): Route.MiddlewareResource => {
    const length = resource.length;
    const middleware: any = length === 3 ? resource[0]: undefined;
    const paths: any = length === 3 ? resource[1]: resource[0];
    const classes: any = length === 3 ? resource[2]: resource[1];

    return [middleware, paths, classes];
}

/**
 *
 * @beta
 */
export class Routers implements Route {
    /**
     *
     */
    readonly app: Route.router;
    /**
     *
     * @param app -
     */
    constructor(app: Route.router) {
        this.app = app;
    }
    /**
     *
     * @param resource -
     */
    resource<P>(...resource: Route.ResourceArgs<P>) {
        const length = resource.length;
        const middleware: any = length === 3 ? resource[0]: undefined;
        const paths: any = length === 3 ? resource[1]: resource[0];
        const classes: any = length === 3 ? resource[2]: resource[1];

        this.router(middleware, paths, classes);
    }

    /**
     *
     * @param middleware -
     * @param paths -
     * @param classResource -
     */
    router(middleware: Route.middlewares, paths: Route.paths, classResource: Route.HandlerResource) {
        if (isArray(paths)){
            for (let i = 0; i < paths.length; i++) {
                this.app.use(paths[i], handlerResource(classResource, middleware))
            }
        } else {
            this.app.use(paths, handlerResource(classResource, middleware));
        }
    }

    /**
     *
     * @param resource -
     */
    get<P>(...resource: Route.ResourceArgs<P>) {
        const [middleware, paths, classResource] = getParams<P>(...resource);
        this.app.get(paths, handlerResource(classResource, middleware));
    }
}

export default Routers;
