<!-- class: center, middle -->
# Object oriented programming in JavaScript

.footnote[by Rytis Alekna (r.alekna@gmail.com)]
.footnote[slideshow powered with Remark.js]
---

## Introduction

#### What is object oriented programming?

Object oriented programming (OOP) is the method to translate real word objects and ideas into programs that are idealized reflection of real life objects and their properties interactions.

--

#### What are objects?

OOP is possible in languages that supports objects - sets of properties and methods (functions that belong to objects) that can hold their own state.

--

#### What is state?

State is all properties of object that can change during program execution.

--

#### What are classes?

Classes are blueprint objects that describes a structure of objects that will be created according to that blueprint.
Usually classes can extend other classes and inherit their structure - this helps avoiding self repetition for similar structures and unifies classes into groups.

---

#### OOP in JavaScript

In JavaScript till ES6 there is no such native thing as classes. This situation makes OOP in JavaScript complicated but that's why I created this slide show for you.

--

#### This is EcmaScript 5

This presentation is for EcmaScript 5 standard (ES5), so no trickery from earlier versions apply and should be considered unwelcome. To enforce ES5 in code you would write `'use strict';` at the beginning of the function body but in this presentation I will not explicitly write it, so just have in mind that there is strict mode everywhere.

---

## Fundamentals of JavaScript functions

Let's talk about *JavaScript* functions, their applications, contexts, `this` keyword and binding

---

### Defining functions

There are three (main) ways to define functions:

--
 1. Defining a named function. The best thing of such declaration is that function is *hoisted* (declared at the very beginning of scope) even if in code it is in the middle of the scope.
    Named functions also get a property `name` with function's name.
    ```javascript
      function Some() {}
      console.log(Some.name); // output: "Some"
    ```
--
 2. Assigning named function to a variable or to the property of object.
    Such functions are not *hoisted* but still get `name` property that is very good for stack traces when you pass functions as values.
    ```javascript
    var Some = function Some() {};
    console.log(Some.name); // output: "Some"
    ```
--
 3. Assigning anonymous closures to a variable. Try using this method less.
    ```javascript
    var Some = function() {};
    console.log(Some.name); // output: ""
    ```
---

### Calling functions, context and `this` keyword

In *JavaScript* when you call a function it is always applied on something - a context. That *context* inside a function is referenced as `this` pointer.
Most of the time people call functions by using brackets `()`. This means that it will be applied on it's default or manually bound `this` object.

```javascript
function myGlobalFunction() {
  "use strict";
  console.log(this);
}
myGlobalFunction(); // output: undefined
// is same as
myGlobalFunction.apply(undefined); // output: undefined
```
--
You can manually specify target object on which function will be applied by calling functions with `apply()` or `call()` methods.
```javascript
// Keyword `this` points to "Hello" String object
myGlobalFunction.apply('Hello'); // output: "Hello".

function sayToName(name) {
  console.log(this + ' ' + name);
}
// first argument is `thisObject` and the rest is arguments to function
sayToName.call('Hello,', 'Rytis'); // output: "Hello, Rytis"
```
---
#### Calling global functions and `this` keyword in non strict environment

In old JavaScript versions and in non *strict mode* global functions are applied on `window` or `global` object.

```javascript
function myGlobalNonStrictFunction() {
  console.log(this);
}
myGlobalNonStrictFunction(); // output: window
// is same as
myGlobalNonStrictFunction.apply(); // output: window
myGlobalNonStrictFunction.apply(undefined); // output: window
myGlobalNonStrictFunction.apply(null); // output: window
myGlobalNonStrictFunction.call(); // output: window
myGlobalNonStrictFunction.call(undefined); // output: window
myGlobalNonStrictFunction.call(null); // output: window
```

And that was the root of most evil associated with JavaScript development because browsers failed to report an error.

**Always try to use `"use strict";` to help browser to help you to avoid this prehistorical thing!**

---
### Functions' contexts

By default in *JavaScript* functions are not tied to one context - it may change depending on where function is executed

--
For functions that are defined as object properties, default target is an object on which function is located
```javascript
var MyObject = {};
var MyOtherObject = {};

function traceThis() {
  "use strict";
  console.log(this == undefined, this == MyObject, this == MyOtherObject);
}
traceThis(); // output: true, false, false
MyObject.traceThis = traceThis;
MyObject.traceThis(); // output: false, true, false

MyOtherObject.traceThis = MyObject.traceThis;
MyOtherObject.traceThis(); // output: false, false, true
```
--
Contexts of functions that are passed as params to other functions are always `undefined`
```javascript
MyObject.execFunction = function(func) { func(); };
MyObject.execFunction(MyObject.traceThis); // output: true, false, false
```
---
### Functions binding to context
Untied function context is quite a useful feature that gives lots of flexibility - it helps reusing function in different situations.

But there are many situations when you want to bind specific context to function so it doesn't change when function is traveling around the code.

Most common situation is when a function closure is passed around as argument for other functions.
---
#### Binding with `.bind()`
In *ES5* function's `.bind()` method comes to help. It creates a new function from a given function that is tied to one context forever.
```javascript
var MyObject = {
  name: 'MyObject',
  traceThisName: function() {
    console.log(this.name);
  }
};
MyObject.traceThisName(); // output: "MyObject"

var MyOtherObject = { name: 'MyOtherObject'};
MyOtherObject.traceThisName = MyObject.traceThisName;
MyOtherObject.traceThisName(); // output: "MyOtherObject"
MyOtherObject.traceThisNameBound = MyObject.traceThisName.bind(MyObject);
MyOtherObject.traceThisNameBound(); // output: "MyObject"
// You can't rebind function that is already bound!
MyOtherObject.traceThisNameBound.apply(MyOtherObject); // output: "MyObject"
```
---
#### Binding by wrapping a function into closure
Unfortunately in *ES* versions before 5th there is no `.bind` method, so other simple technique was used to accomplish same thing - wrapping
```javascript
var MyObject = {
  name: 'MyObject',
  traceThisName: function() {
    console.log(this.name);
  }
};
var MyOtherObject = { name: 'MyOtherObject'};
MyOtherObject.traceThisNameBound = function() {
  return MyObject.traceThisName();
};
MyOtherObject.traceThisNameBound(); // output: "MyObject"
```
Context is not lost because `this` keyword is not used in wrapping function - only direct reference to object.

---
#### Binding with most common JS libraries
With *jQuery* you can bind function by using `$.proxy()` method
```javascript
var MyObject = {
  name: 'MyObject',
  traceThisName: function() {
    console.log(this.name);
  }
};
var MyOtherObject = { name: 'MyOtherObject'};
MyOtherObject.traceThisName = $.proxy(MyObject.traceThisName, MyObject);
```
In *underscore* use `_.bind()`
```javascript
MyOtherObject.traceThisName = _.bind(MyObject.traceThisName, MyObject);
```
Behind the scenes these methods use wrapping in browsers that doesn't support `.bind()`. A primitive version of it below:
```javascript
function bind(func, context, defaultArgs) {
  defaultArgs = defaultArgs || [];
  return function bound(args) {
    args = args || [];
    return func.apply(context, defaultArgs.concat(args));
  }
}
```
---
## Classes and prototypes

--
### Some basic theory stuff about classes

#### What is class (again)?
In programming a class is an object (a set) with various properties that can be values, other objects or functions. This object is used as a model to make clones of it.

In some languages like *Java* classes are deep feature of the language but in others like *JavaScript* it much more just a syntactic sugar.

Usually an object created from a class get some metadata that tells from which class object was created.

Class members belong to either class instance (*instance* members) or to class itself (*static* members).

They may have different access levels like *public* (accessible to whole world), *private* (accessible only to other members of same class) or *protected* (accessible to other members of same class or subclass) 

---
#### What is constructor?

Constructor in objective languages is a special function in a class that is applied on freshly created clone of class to do some (optional) initial customization based on provided params.

---
### Creating classes and instantiating them in JavaScript
--

As mentioned earlier, in *JavaScript* traditional classes doesn't exist so you need some knowledge to simulate features of traditional classes. 

---
#### Constructors in JavaScript 

In traditional class (like in *Java*), constructor is held inside class body
```java
public class Some {
  // a start of class body
  public Some() {} // <- constructor
  public void someMethod() {}
  // the end of class body
}
```
--
In *JavaScript* every function is also a constructor for a class which definition is stored in function's `prototype` property.
```javascript
function Some() {} // <- constructor
// a start of class body
Some.prototype.someMethod: function(){}
Some.prototype.otherMethod: function(){}
// the end of class body
```
Newly defined function's `prototype` property is usually just a plain `Object` with a property `constructor` that refers to constructor function itself

---
#### Instantiation
To create a new instance of class a keyword `new` is used in fornt of calling constructor function
```javascript
function Some() {
  console.log('inside constructor', this);
}

Some.prototype.someMethod = function(){
  console.log('inside someMethod', this);
};

var some = new Some(); // output: "inside constructor" Some {someMethod: function()}
some.someMethod(); // output: "inside someMethod" Some {someMethod: function()}
```
---
name: instantiation-explanation
#### What happens during instantiation?

---
template: instantiation-explanation
count: false
It is important to understand what happens behind the scenes when a constructor is called

---
template: instantiation-explanation
count: false

- A new plain object is created
  ```javascript
  var o = {};
  ```
--
- Surface properties of prototype are copied into `o` object.
 
  **Remember that it is not a deep object cloning - properties are just copied!** If there are any references then they will be shared between all new instances - this can lead to big headaches.

  ```javascript
  for (var name in Some.prototype) {
      o[name] = Some.prototype[name];
  }
  ```
--
- Object gets reference original `prototype` via `__proto__` property
   ```javascript
   o.__proto__ = Some.prototype;
   ```
--
- Constructor is applied on object `o`
   ```javascript
   Some.apply(o); // output: "inside constructor", Some {}
   ```
---
name: basic-class
### Basic class
---
template: basic-class
In example bellow you can see a very basic class setup
```javascript
function SomeClass(name) {
  this.name = name; // setting property in constructor
  // everything you set in constructor is later visible in prototype's functions
  this.myInstanceMethod();
}
SomeClass.myStaticProperty = "I\'m static property";
SomeClass.myStaticMethod = function() {
  console.log(SomeClass.myStaticProperty);
};
SomeClass.prototype.predefinedInstanceProperty = "version";
// ^ be sure to not set in prototype objects that are passed by reference,
// ^ because it will be shared by all instances.
// ^ Use only primitive values or null
SomeClass.prototype.myInstanceMethod = function() {
  console.log(this.name);
  SomeClass.myStaticMethod(); // You can access static members
}
```
---
template: basic-class
#### Features of plain class
- A public constructor where you can do initial setup
  ```javascript
  function SomeClass(name) {
      this.name = name; // setting instance and static properties
      this.myInstanceMethod(); // calling instance and static methods
  }
  ```
--
- Public static properties and methods
  ```javascript
  SomeClass.myStaticProperty = "I\'m static property";
  SomeClass.myStaticMethod = function() {
      console.log(SomeClass.myStaticProperty);
  };
  ```
--
- Public instance properties and methods
  ```javascript
  SomeClass.prototype.predefinedInstanceProperty = "version";
  SomeClass.prototype.myInstanceMethod = function() {
      console.log(this.name);
      SomeClass.myStaticMethod();
  }
  ```
---
template: basic-class
#### Cons of basic class
--

- No privacy:
  You can't encapsulate anything except by using some stupid hacks
--

- Definition of a class is spread around global scope
--

- No static constructor that initializes a class (not an instance)
---
layout: true
### Featured class
---

Let's enhance our `SomeClass` class to get those features. At first surround our previous class definition by self executing closure that returns class constructor as its return value.
```javascript
var SomeClass /* Save returned class definition somewhere */ = (function() {
  // All class definition is inside a clojure
  // Put static members at the top of the class definition
  SomeClass.myPublicStaticProperty = "I\'m static property";
  SomeClass.myPublicStaticMethod = function() {
      console.log(SomeClass.myPublicStaticProperty);
  };

  function SomeClass(name) { // constructor
      this.name = name;
      this.myPublicInstanceMethod();
  }

  // add prototype properties and methods here
  SomeClass.prototype.predefinedPublicInstanceProperty = "version";
  SomeClass.prototype.myPublicInstanceMethod = function() {
      // instance members are accessible to other instance members by using `this`
      console.log(this.name, this.predefinedInstanceProperty);
      SomeClass.myPublicStaticMethod();
  }
  return SomeClass; // return constructor
})(); // execute closure
```
---

Let's add private static members. Some members were removed to save space.
```javascript
var SomeClass = (function() {
  // private static members are accessible for all class members
  var privateStaticVar = 'version';
  var uuid = 0;
  function privateStaticFunction() {
    console.log(privateStaticVar);
    // Remember that you can't use `this` inside static functions -
    // it will either be `undefined` (strict mode) or will point to `window` object!
  }

  function SomeClass(name) {
    uuid++;
    privateStaticFunction();
  }

  SomeClass.prototype.myPublicInstanceMethod = function() {
      console.log(uuid);
      privateStaticFunction();
  }
  return SomeClass;
})();
```

---

Let's finnish our class and add static constructor. It may be used for initialising some constants
```javascript
var SomeClass = (function() {
  var MY_CONSTANT_ARRAY = [];

  // Static constructor - it is just another self executing closure.
  (function() {
    // variables inside static constructor doesn't trash static class environment
    for( var i = 0, j = 2; i < 1000; i++) MY_CONSTANT_ARRAY.push( i * j );
    privateStaticFunction(); // you can access all static members of class
  })();

  function privateStaticFunction() {
    console.log(privateStaticVar);
    // Remember that you can't use `this` inside static functions -
    // it will either be `undefined` (strict mode) or will point to `window` object!
  }

  function SomeClass(name) { // Instance constructor
    this.myPublicInstanceMethod();
  }

  SomeClass.prototype.myPublicInstanceMethod = function() { /* */ }
  return SomeClass;
})();
```


---

```javascript
var SomeClass = (function() {
  var PRIVATE_CONSTANT = "constant";

  function privateStaticMethod() {
    console.log(privateStaticVar);
  }

  SomeClass.myPublicStaticProperty = "I\'m static property";
  SomeClass.myPublicStaticMethod = function() {
      privateStaticMethod()
      return SomeClass.myPublicStaticProperty + privateStaticVar;
  };

  (function() { // static constructor
    privateStaticMethod();
  })();

  function SomeClass(name) { // Instance constructor
    this.name = name;
    this.myPublicInstanceMethod();
  }

  SomeClass.prototype.myPublicInstanceProperty  = PRIVATE_CONSTANT;
  SomeClass.prototype.myPublicInstanceMethod    = function(arg) {
    return this.name + this.myPublicInstanceProperty + PRIVATE_CONSTANT;
  }
  return SomeClass;
})();
```

---
layout: true
### Using different types of class members
---
--

- **When should I use a class instead of plain object?**

  Then when your object is supposed to have changing state and contains functions that interact with other properties of object.
--

- **When should I use instance methods?**

  Then when you want to change or get a state of object and hide the logic of it.
--

- **When should I use instance variables?**

  Then when you want to store a very unique information about object's state
--

- **When should I use *private* *static* methods?**

  Then when want to operate only on function input and not create side effects in global state.
  You should try to use static functions as much as possible because it easily debuggable, saves computers memory and most of the time allows to avoid tricky function binding
---

- **When should I use *private* *static* variables?**

  Then when you want to store some global settings for behaviour of instances of that class.
  They are also very good when you want register, manage, access and pool all created class instances.
--

