<!-- class: center, middle -->
# Object oriented programming

---

### What is object oriented programming?

Object oriented programming (OOP) is the method to translate real word objects and ideas into programs that are idealized reflection of real life objects and their properties interactions.

--

### What are objects?

OOP is possible in languages that supports objects - sets of properties and methods (functions that belong to objects) that can hold their own state.

--

### What are classes?

Definitions, *platonic* ideas and blueprints of things, people, actions and other stuff that in natural language would be *common noun* or would have *indefinite article*, in programming language resembles to classes.
Classes can extend other classes and inherit their properties.

---

## OOP in JavaScript

In JavaScript till ES6 there is no such native thing as classes. This situation makes OOP in JavaScript complicated but that's why I created this slide show for you.

--

## This is EcmaScript 5

This presentation is for EcmaScript 5 standard (ES5), so no trickery from earlier versions apply and should be considered unwelcome. To enforce ES5 in code you would write `'use strict';` at the beginning of the function body but in this presentation I will not explicitly write it, so just have in mind that there is strict mode everywhere.

---

## Functions and `this`

Let's talk about functions and `this` keyword first

--

This is simple function that doesn't have a state.
It knows about its params, surrounding objects and its name (if it's not anonymous)

```javascript
var some = 'hello';
function myFunction(param) {
  return some + ' ' + param;
}

```

--

But it can't refer to itself because it is dead (returned) immediately.

```javascript
function myFunction() {
  console.log('You know nothing, John Snow! ', this);
}

myFunction(); // output: "You know nothing, John Snow! undefined" 

```

Note: in previous versions of *JavaScript* `this` inside a global function used to reference `window` object

---

## Keyword `new` and constructors

---

### What is constructor?

Constructor in objective languages is a special method in a class that is executed during the creation of object to do some (optional) customization based on provided params.

Like in *Java*

```java
public class Some {
  public Some () {
    System.out.println("Hello, some");
  }
}
new Some(); // prints "Hello, some"
```
or *Ruby*
```ruby

class Some
  def initialize
    puts "Hello, some"
  end
end
Some.new # prints "Hello, some"

```

---

### But if there are no built-in classes in JavaScript so how can there be constructors??!!1!

--

Well, in *JavaScript* all functions are naturally classes and constructors of those classes themselves.

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
