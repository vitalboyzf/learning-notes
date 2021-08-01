import Axios from "./Axios";
import { CancelToken, isCancel } from "./Cancel";
import { AxiosInstance } from "./types";
function createInstance(): AxiosInstance {
    const context = new Axios();
    let instance = Axios.prototype.request.bind(context);
    instance = Object.assign(instance, Axios.prototype, context);
    return instance as AxiosInstance;
}
let axios = createInstance();
axios.cancelToken = new CancelToken();
axios.isCancel = isCancel;
export default axios;
export * from "./types";