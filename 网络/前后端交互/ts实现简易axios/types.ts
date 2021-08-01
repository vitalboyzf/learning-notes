import interceptorManager from "./AxiosInterceptorManager";

export type Methods = 'get' | 'post' | 'put' | 'delete' | 'patch';
export interface AxiosRequestConfig {
    url?: string;
    method?: Methods;
    params?: any;
    headers?: Record<string, any>;
    data?: Record<string, any>;
    timeout?: number;
    transformRequest?: (data: any, header: any) => any;
    transformResponse?: (data: any) => any;
    cancelToken?: any;
}
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
    interceptors: {
        request: interceptorManager<AxiosRequestConfig>
        response: interceptorManager<AxiosResponse>
    }
    cancelToken?: any;
    isCancel?: any
}
export interface AxiosResponse<T = any> {
    data: T;
    status: number,
    statusText: string
    headers?: Record<string, any>
    config?: AxiosRequestConfig
    request?: XMLHttpRequest
}