class: center, middle
# Object oriented programming

---

## What is object oriented programming?

--
Object oriented programming is the method to translate real word objects and ideas into programs that are idealized reflection of real life objects and their properties interactions.

--
Definitions, *platonic* ideas and blueprints of things, people, actions and other stuff that in natural language would be *common noun* or would have *indefinite article*, in programming language resembles to classes.

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
