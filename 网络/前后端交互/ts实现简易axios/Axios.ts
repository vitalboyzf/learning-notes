import { AxiosRequestConfig, AxiosResponse } from './types';
import qs from "qs";
import parseHeaders from "parse-headers";
import interceptorManager, { Interceptor } from "./AxiosInterceptorManager";
// 默认合并
let defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            accept: 'application/json'
        }
    },
    transformRequest(data: any, header: any) {
        header['common']['content-type'] = 'application/json';
        return JSON.stringify(data);
    },
    transformResponse(response: any) {
        return response;
    }
}
let postStyleMethods = ['put', 'post', 'patch'];
postStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {
        'content-type': 'application/json'
    }
})
let getStyleMethods = ['get', 'head', 'delete', 'options'];
getStyleMethods.forEach(method => {
    defaults.headers![method] = {};
})
let allMethods = [...getStyleMethods, ...postStyleMethods];
export default class Axios<T> {
    public defaults: AxiosRequestConfig = defaults;
    public Interceptors = {
        request: new interceptorManager<AxiosRequestConfig>(),
        response: new interceptorManager<AxiosResponse<T>>()
    }
    request(config: AxiosRequestConfig): Promise<AxiosResponse<T> | AxiosRequestConfig> {
        // Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>
        config.headers = Object.assign(this.defaults.headers, config.headers);
        if (config.transformRequest && config.data) {
            config.data = config.transformRequest(config.data, config.headers);
        }
        // 拦截器链条
        const chain: Array<any> = [
            // 默认的拦截器，执行dispatchRequest函数
            { onFulfilled: this.dispatchRequest },
        ]
        // 取出请求拦截器数组，从首部添加到chain链条中
        this.Interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
            interceptor && chain.unshift(interceptor);
        })
        // 取出响应拦截器数组，从尾部添加到chain链条中
        this.Interceptors.response.interceptors.forEach((interceptor: Interceptor<AxiosResponse<T>> | null) => {
            interceptor && chain.push(interceptor);
        })
        let promise = Promise.resolve(config);
        while (chain.length) {
            // 从chain链中拿出一个拦截器对象 的onFulfilled, onRejected方法，执行
            const { onFulfilled, onRejected } = chain.shift()!;
            promise = promise.then(onFulfilled, onRejected);
        }
        return promise;
    }
    dispatchRequest(config: AxiosRequestConfig): Promise<AxiosResponse<T> | AxiosRequestConfig> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            let { method, url, params, data, headers, timeout } = config;
            let request = new XMLHttpRequest();
            if (params) {
                params = qs.stringify(params);
                url += ((url!.indexOf("?") === -1 ? '?' : '&') + params);
            }
            request.open(method!, url!, true);
            request.responseType = "json";
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    // 完成请求，得到响应
                    if (request.status >= 200 && request.status <= 300 && request.status !== 0) {
                        let response: AxiosResponse<T> = {
                            data: request.response,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        if (config.transformResponse) {
                            response = config.transformResponse(response);
                        }
                        resolve(response);
                    } else {
                        reject("请求失败" + request.status)
                    }
                }
            }
            // 请求头合并配置
            if (headers) {
                // 循环headers
                for (const key in headers) {
                    // 如果key是common或者当前key是允许的方法
                    if (key === 'common' || allMethods.includes(key)) {
                        // 如果key是common,或者key是当前的请求方法
                        if (key === "common" || key === config.method) {
                            // 获取当前方法的默认配置
                            for (const key2 in headers[key]) {
                                // 添加到请求头中
                                request.setRequestHeader(key2, headers[key][key2]);
                            }
                        }
                    } else
                        request.setRequestHeader(key, headers[key]);
                }
            }
            let body: string | null = null;
            if (data) {
                body = JSON.stringify(body);
            }
            // 网络异常处理
            request.onerror = function () {
                reject("网络错误")
            }
            // 超时处理
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = function () {
                    reject("超时" + timeout);
                }
            }
            // 取消请求
            if (config.cancelToken) {
                // 当执行 source.token 就会resolve这个promise，从而执行下面then的回调
                config.cancelToken.then((message: string) => {
                    // 取消请求
                    request.abort();
                    reject(message);
                })
            }
            request.send(body);
        })
    }
}