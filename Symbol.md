# Symbol

## symbol 是一种基本数据类型，Symbol()函数会返回symbol类型的值，Symbol具有静态属性和静态方法，每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。

### 基本使用 Symbol([description])

* Symbol函数创建的Symbol每一个都是唯一的，不相等

``` js
const s1 = Symbol("描述");
const s2 = Symbol("描述");
console.log(s1 === s2); //false
```

* Symbol.for函数创建的Symbol如果描述参数相同，则这两个Symbol相同

``` js
const s1 = Symbol.for("描述");
const s2 = Symbol.for("描述");
console.log(s1 === s2); //true
// 通过Symbol.for创建的Symbol可以用 Symbol.keyFor(需要查找的Symbol)从全局注册表中查找到该symbol，如果找到了，返回Symbol的描述信息，返回类型为string，找不到返回undefined
console.log(Symbol.keyFor(s1)) //描述
```

### Symbol常用具名符号(Symbol上的属性) 

* ==Symbol.asyncIterator== 符号指定了一个对象的默认异步迭代器。如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环。

``` js
    let obj = {
        *[Symbol.asyncIterator]() {
            // this为obj对象
            yield "hello";
            yield "async";
            yield "iteration!";
        }
    };
    // await关键字需要在async函数内
    (async () => {
        for await (const x of obj) {
            // 迭代yield的值
            console.log(x);
        }
    })();
```

* ==Symbol.hasInstance== Function.prototype的属性，被所有函数继承， 用于构造函数识别它的实例，可以重写这个方法达到一些想要的效果，这个方法参数为需要确定的对象，方法返回true则***obj instanceOf 构造函数***返回true，否则返回false

``` js
// 类函数
class Array1 {
    static[Symbol.hasInstance](instance) {
        // instance 为需要判断的[]
        return Array.isArray(instance);
    }
}

console.log([] instanceof Array1); // true
// 普通函数
function MyArray() {}
Object.defineProperty(MyArray, Symbol.hasInstance, {
    value: function(instance) {
        // instance 为需要判断的[]
        return Array.isArray(instance);
    }
});
console.log([] instanceof MyArray); // true
```

* 除了使用instanceof判断，你还可以使用函数的***Symbol.hasInstance***方法

``` js
class Animal {
    constructor() {}
}

const cat = new Animal();

console.log(Animal[Symbol.hasInstance](cat)); // true
```

* ==Symbol.isConcatSpreadable== 用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素。

``` js
    let arr = [3, 4, 5];
    let newArr = [6, 7, 8];
    console.log(arr.concat(newArr)) //[3,4,5,6,7,8]
    //在Array原型上设置这个属性，所有数组concat拼接时不展开
    Array.prototype[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat(newArr)); //[[3,4,5],[6,7,8]]
    // 单个数组也可以添加这个属性 添加这个属性后，只有这个数组concat拼接的时候不展开
    newArr[Symbol.isConcatSpreadable] = false;
    console.log(newArr); //[6, 7, 8, Symbol(Symbol.isConcatSpreadable): false]
```

* ==Symbol.iterator== 具有这个函数的的对象，被称为可迭代对象，如[], "string", 可以被for of循环迭代

``` js
// 创建一个可迭代对象
const myIterable = {}
myIterable[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
```

* ==Symbol.match== 指定了匹配的是正则表达式而不是字符串。String.prototype.match() 方法会调用此函数。

``` js
 //String.prototype.startsWith()
 //String.prototype.endsWith()
 //String.prototype.includes()
 //这些方法会检查其第一个参数是否是正则表达式， 是正则表达式就抛出一个TypeError。现在，如果 match.
 //symbol 设置为 false（ 或者一个假值）， 就表示该正则对象作为字符串使用。
 const regexp1 = /foo/;
 // 设置为false 在使用startsWith或者endsWith时把regexp1作为字符串
 regexp1[Symbol.match] = false;
 console.log('/foo/'.startsWith(regexp1));
 console.log('/baz/'.endsWith(regexp1));
```

* ==Symbol.prototype.description==  是一个只读属性，它会返回 Symbol 对象的可选描述的字符串。

``` js
        console.log(Symbol('desc').description); //desc
        console.log(Symbol.iterator.description); //Symbol.iterator
        console.log(Symbol.for('foo').description); //foo
```

* ==Symbol.toPrimitive== 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。

``` js
     const obj = {
         [Symbol.toPrimitive](hint) {
             // hint转换到的原始值的预期类型 "number"、"string" 和 "default" 中的任意一个
             console.log(hint)
             // 返回值作为转化后的值
             return 1;
         }
     }
     console.log(+obj); // hint为number
     console.log(`${obj}`); //hint为string
     console.log(String(obj)); //hint为string
     console.log(obj + ""); // hint 为default
```

* ==Symbol.toStringTag== 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。
  + 许多内置的 JavaScript 对象类型即便没有 toStringTag 属性，也能被 toString() 方法识别并返回特定的类型标签，比如：

  

``` js
  Object.prototype.toString.call('foo'); // "[object String]"
  Object.prototype.toString.call([1, 2]); // "[object Array]"
  Object.prototype.toString.call(3); // "[object Number]"
  Object.prototype.toString.call(true); // "[object Boolean]"
  Object.prototype.toString.call(undefined); // "[object Undefined]"
  Object.prototype.toString.call(null); // "[object Null]"
```

  + 另外一些对象类型则不然，toString() 方法能识别它们是因为引擎为它们设置好了 toStringTag 标签：

``` js
  Object.prototype.toString.call(new Map()); // "[object Map]"
  Object.prototype.toString.call(function*() {}); // "[object GeneratorFunction]"
  Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
```

  + 加上 toStringTag 属性，你的类也会有自定义的类型标签了：

``` js
class ValidatorClass {
    // 给[Symbol.toStringTag]属性赋值，对象转化为字符串 "[object 这里的值]"
    [Symbol.toStringTag] = "Validator"
    // get[Symbol.toStringTag]() {
    //     return "Validator";
    // }
}
//console.log(new ValidatorClass() + ""); "[object Validator]"
console.log(Object.prototype.toString.call(new ValidatorClass())); // "[object Validator]"
```

* Symbol.replace 这个属性指定了当一个字符串替换所匹配字符串时所调用的方法。

  
