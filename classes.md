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
```javascript
function SomeClass(prop) {
  // this function body is constructor

  // if you set
  this.prop = prop;
}

var someClassInstance = new SomeClass('something');

log( someClassInstance.prop ); // 'something'

// in modern browsers, you can get class name with read-only property `name`
log( SomeClass.name ); // 'SomeClass'
```
