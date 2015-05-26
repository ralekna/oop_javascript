<!-- class: center, middle -->
# Object oriented programming in JavaScript

---

## Introduction

#### What is object oriented programming?

Object oriented programming (OOP) is the method to translate real word objects and ideas into programs that are idealized reflection of real life objects and their properties interactions.

--

#### What are objects?

OOP is possible in languages that supports objects - sets of properties and methods (functions that belong to objects) that can hold their own state.

--

#### What are classes?

Definitions, *platonic* ideas and blueprints of things, people, actions and other stuff that in natural language would be *common noun* or would have *indefinite article*, in programming language resembles to classes.
Classes can extend other classes and inherit their properties.

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
---
### What is class (again)?
In programming a class is an object (a set) with various properties that can be values, other objects or functions. This object is used as a model to make clones of it.

In some languages like *Java* classes are deep feature of the language but in others like *JavaScript* it much more just a syntactic sugar.
Usually an object created from a class get some metadata that tells form which class object was created.
---
### What is constructor?

Constructor in objective languages is a special function in a class that is applied on freshly created clone of class to do some (optional) initial customization based on provided params.

Like in *Java*

```java
public class Greeter {

  private String name;

  public Greeter(String name) {
    this.name = name;
    this.sayHello();
  }

  public void sayHello() {
    System.out.println("Hello, " + this.name);
  }
}
new Greeter("Rytis"); // prints "Hello, Rytis"
```

---
### But if there are no built-in classes in JavaScript so how can there be constructors?
--

Well, in *JavaScript* all functions are naturally constructors of those classes themselves.

--

So a keyword `new` just forces a function to behave like a class constructor.

--

That is what happens when you call a function as constructor behind the scenes
 1. A new plain object is created like `{}`
 2. All properties of *prototype* object of the Function that is called as constructor is copied to a newly created object

---

## Plain classes

### The simplest class

Use such class type only for value objects, because they doesn't allow elegant private static scope and is not enclosed in a block scope.

```javascript
function SomeClass(prop) {
  // this function body is constructor

  // if you set
  this.prop = prop;
}

SomeClass.public_static_property = 'my static value';

var someClassInstance = new SomeClass('something');

log( someClassInstance.prop ); // 'something'

// in modern browsers, you can get class name with read-only property `name`
log( SomeClass.name ); // 'SomeClass'
```

---

### Full featured class 
```javascript
(function() {
  // code in this function is executed once. It is a static class constructor
  // define private static vars and functions here. They will be accessible to all members of class.
  var some_private_static_var = 'Something';
  
  // if you want to write a method that doesn't change class instance state it is best thing to define it in static scope, 
  // because it saves computer memory
  function myPrivateUtility () {
  }
  
  function SomeClass(my_param) {
    // this is non static class constructor
    // it is executed everytime when new instance is created
    this.my_instance_variable = my_param;
  }
  
  SomeClass.prototype = {
    // here goes instance methods and variables
    my_instance_variable: null, // <-- have in mind that if you set a variable value here it will be shared between all instances. 
    // If you don't want it to be shared then set the value in while in constructor like this.my_instance_valiable = 'something';
    myInstanceMethod: function () {
      // instance varaibles are accesible by using this
      this.my_instance_variable
    },
  };
  
  // return constructor
  return SomeClass;
  
})();
```
