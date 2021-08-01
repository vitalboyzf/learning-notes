// 拦截器管理器
interface OnFulfilled<V> {
    (value: V): V | Promise<V>
}
interface OnRejected {
    (error: any): any
}
export interface Interceptor<V> {
    onFulfilled?: (value: V) => V | Promise<V>
    onRejected?: OnRejected
}
export default class interceptorManager<V> {
    public interceptors: Array<Interceptor<V> | null> = [];
    use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
        this.interceptors.push({
            onFulfilled,
            onRejected
        })
        return this.interceptors.length - 1;
    }
    eject(id: number) {
        if (this.interceptors[id])
            this.interceptors[id] = null;
    }
}