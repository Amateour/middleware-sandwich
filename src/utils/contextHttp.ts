export const contextHttp: any = (() =>{
    class contextHttp {
        request = undefined
        response = undefined;
    }

    return new contextHttp();
})();

export const requestGet = () => contextHttp.request;
export const responseGet = () => contextHttp.response;
