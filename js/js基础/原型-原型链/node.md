
# 原型原型链 深入浅出

------
### 原型
>* js高级程序设计：我们创建的每一个函数都有一个prototype属性（原型），如果这个属性是一个指针，指向一个对象，而这个对象的用途是```包含可以由特定类型的所有实例共享```的属性和方法。
prototype就是通过调用构造函数而创建的那个对象实例的原型对象。
使用原型对象的好处是可以直接将这些信息添加到原型对象中。

>* 换一种解释，原型是Function对象的一个属性，它定义了构造函数制造出的对象的公共祖先，通过该构造函数产生的对象，可以继承该原型的属性和方法。要注意==原型也是对象== ，实例对象通过隐式属性__proto__查看原型。

 #### 1.函数的每一个实例对象都指向同一个原型对象。
<img src = "https://img-blog.csdnimg.cn/20191211220623827.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDQwNDAyOA==,size_16,color_FFFFFF,t_70" width="40%">

```javascript
        function A(){}
      var a = new A();
      var b = new A();
   a.__proto__===A.prototype  //true
   b.__proto__===A.prototype  //true
```
#### 2.所有函数都有一个属性：prototype，称之为函数原型,默认情况下，prototype是一个普通的Object对象，我们可以在原型上添加属性和方法。
```javascript
     function Animals(name,age){
         this.name = name;
         this.age = age;
    }
    Animals.prototype.getAnimal = function(){
        console.log(this.name,this.age);//打印 dog 5
    } //在原型上添加函数。
    let animal = new Animals('dog',5);
    animal.getAnimal();//调用原型上的函数
```

#### 3. 在 JavaScript 中，我们并不会将一个对象（ “类” ）复制到另一个对象（ “实例” ） ，只是将它们 关联起来。从视觉角度来说，[[Prototype]] 机制如下图所示，箭头从右到左，从下到上：
<img src="https://img-blog.csdnimg.cn/20191212081958884.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDQwNDAyOA==,size_16,color_FFFFFF,t_70" width="40%">


#### 这个机制通常被称为原型继承，它常常被视为动态语言版本 的类继承。

#### 4.默认情况下，prototype中有一个属性constructor，它也是一个对象，它指向构造函数本身。

    Animals.prototype.constructor===Animals //true


   #### 5.如果函数内部没有实例对象所调用的方法，就会到原型链中去找，所以如果函数内部有实例对象需要调用的方法，他就会直接调用函数内部的方法。
    
```javascript
   function ABC(name){
            this.getName = function(){
                console.log(name);
            }
        }
        ABC.prototype.getName = function(){
            console.log('hello')
        }
    var abc = new ABC('ZF')
   abc.getName();//调用getName,打印ZF
```
#### 6.要注意由于prototype指向一个对象是引用类型，如果将函数的原型指向另一个新对象，它的实例对象的__proto__就不会再指向它的原型；
```javascript
 function ABC() {
            ABC.prototype = {
            }
        }
        var abc = new ABC()
        abc.__proto__===ABC.prototype  //false
```

#### 7.做三道题   
   
     1.
      Person.prototype.name = 'Merry'
      function Person(){
          
      }
      var person = new Person();
      Person.prototype.name = 'Xiaoing'
      console.log(person.name); 
      ---------------------------
    2.
     Person.prototype.name = 'Merry'
      function Person(){
          
      }
      var person = new Person();
      Person.prototype = {
          name:'Xiaoing'
      }
      console.log(person.name);
     3.
    Person.prototype.name = 'Merry'
      function Person(){   
      }
      Person.prototype={
          name:'Xiaoing'
      }
      var person = new Person();
      console.log(person.name);
     
     
     
 #### 第一道题打印Xiaoing,第二道打印Merry,第三个打印Xiaoing.

 ##### 由于在 ==new== 的时候，在函数内部会生成一个隐式指向```this = {__proto__:Person.prototype}```，所以在==new==前后放置原型指向会有区别，可以理解==new==的时候才会确定构造函数的原型指向。
 
## 原型链
>* 原型链作为实现继承的主要方法，其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
构造函数，原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针```__proto__```。
>* 假如我们让原型对象等于另一个原型的实例，此时的原型对象将包含一个指向另一个原型的指针，相应的，另一个原型也包含着一个指向另一个构造函数的指针，假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条，也就是原型链。
    
```javascript
  Person.prototype.like = "play";
        function Person() {
        }
        var person = new Person();
        Father.prototype = person;
        function Father() {
            this.age = 18;
        }
        var father = new Father();
        function Son() {
            this.name = "zf"
        }
        Son.prototype = father;
        var son = new Son();
        console.log(son.name); //zf
        console.log(son.age); //18
        console.log(son.like); //play
```
 

 ##  关系如下：

Function比较特殊，他的prototype和__proto__都指向他的原型，

```javascript
Function.prototype===Function.__proto__。
```
实例对象的__proto__最终指向都是Object.prototype,所以对象都能使用Object.prototype的方法。

### 下图可以清晰看出来原型链上的指向关系。

<img src = "https://img-blog.csdnimg.cn/20191211221610989.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDQwNDAyOA==,size_16,color_FFFFFF,t_70" width="40%">

当实例对象需要某个方法，它就会沿着原型链向上寻找，直到Object.prototype。
由此我们可以在函数的原型上重写Object.prototype的方法，或者在函数原型上添加某个自定义方法。

 ```javascript
  Array.prototype.myAdd = function () {
            return '你好啊';
        }
        var arr = new Array();
        var result = arr.myAdd();
        console.log(result);  //你好啊
```

       
### 下面来看看下面题目
```javascript
function User() {}
User.prototype.sayHello = function() {}

var u1 = new User();
var u2 = new User();

console.log(u1.sayHello === u2.sayHello); 
console.log(User.prototype.constructor); 
console.log(User.prototype === Function.prototype); 
console.log(User.__proto__ === Function.prototype);
console.log(User.__proto__ === Function.__proto__); 
console.log(u1.__proto__ === u2.__proto__);  
console.log(u1.__proto__ === User.__proto__); 
console.log(Function.__proto__ === Object.__proto__); 
console.log(Function.prototype.__proto__ === Object.prototype.__proto__); 
console.log(Function.prototype.__proto__ === Object.prototype);
```





### 看看答案吧
console.log(u1.sayHello === u2.sayHello); //true
console.log(User.prototype.constructor); //User Function
console.log(User.prototype === Function.prototype); // false
console.log(User.__proto__ === Function.prototype); // true
console.log(User.__proto__ === Function.__proto__); // true
console.log(u1.__proto__ === u2.__proto__);  // true
console.log(u1.__proto__ === User.__proto__); // false
console.log(Function.__proto__ === Object.__proto__); // true
console.log(Function.prototype.__proto__ === Object.prototype.__proto__); // false
console.log(Function.prototype.__proto__ === Object.prototype); // true
        