import {
    reactive
} from "./reactive.js";
import {
    effect
} from "./effect.js";
import {
    ref
} from "./ref.js";
// const obj = {
//     name: "zf",
//     like: ["web", "java", "python"]
// };
// const proxy = reactive(obj);
// effect(() => {
//     console.log(proxy.like.length);
// });
// setTimeout(() => {
//     proxy.like.length = 10;
//     console.log(proxy.like);
// });
const val = ref(2);
console.log(val.value);
val.value = 34;
console.log(val);