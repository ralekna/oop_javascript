<!-- class: center, middle -->
# Dark Secrets of JavaScript Exposed

--

### Click to know why all front-end developers hate me for revealing these best kept secrets

--

.footnote[by Rytis Alekna @ SameSystem (r.alekna@gmail.com) (@alekna_info)]

.footnote[slideshow powered with Remark.js]

---

# Spoiler alert!

Code examples are copy-pasted from this well crafted quiz:

[http://perfectionkills.com/javascript-quiz/]

If you want to measure your knowledge do it before continuing

---

# Rules of code examples

--

- Assuming ECMAScript 3rd edition (not 5th)

--

- Implementation quirks do not count (assuming standard behavior only)

--

- Every snippet is run as a global code (not as eval or function one)

--

- There are no other variables declared (and host environment is not extended with anything beyond what's defined in specs)

--

- Answer should correspond to exact return value of entire expression/statement (or last line)

--

- "Error" in answer indicates that overall snippet results in a runtime error

---

# Example 1: root of all arguments

```javascript
(function(){
  return typeof arguments;
})();
```

--

### Possible answers

- "object"
- "array"
- "arguments"
- "undefined"
---

## Answer

It is "object".

While arrays and array-like objects like `arguments` looks very primitive and should have its own type but it doesn't.

Have in mind that in ES6 arrow functions `arguments` object doesn't exist.

---

## Example 2: Character of Michael Jordan

```
var f = function g(){ return 23; };
typeof g();
```

--

### Possible answers
- "number"
- "undefined"
- "function"
- Error

---

## Answer

You would get a ReferenceError because function `g` got only name but was not **hoisted** in the scope. It only exists as closure in variable `f`.

---

## Example 3: No Man No problems

```
(function(x){
  delete x;
  return x;
})(1);
```

--

### Possible answers

- 1
- null
- undefined
- Error

---

## Answer

Function would still return `1` because with `delete` operator you can take away properties from object, but can't get rid objects themselves.

---

## Example 4: Giving Birth To Yourself

```
var y = 1, x = y = typeof x;
x;
```

--

### Possible answers

- 1
- "number"
- undefined
- "undefined"

---

## Answer

It would be "undefined" (string) because at the execution time `x` would be `undefined` and its type `"undefined"` would be assigned to `y` and `x`.

---

## Example 5: The Case Of Cannibalism

```
(function f(f){
   return typeof f();
 })(function(){ return 1; });
```

--

### Possible answers

- "number"
- "undefined"
- "function"
- Error

---

## Answer

Correct answer is `"number"`.

In the stomach of function body arguments with the same name as function itself wins the fight for a name.

---

## Example 6: Behind The Bars

```
var foo = {
  bar: function() { return this.baz; },
  baz: 1
};
(function(){
  return typeof arguments[0]();
})(foo.bar);
```

--

### Possible answers

- "undefined"
- "object"
- "number"
- "function"

---

## Answer

Correct answer is "undefined". When `foo.bar` was passed to function as argument it immediately lost its original execution scope (and object to which `this` keyword points) and it became global `window` object.

In case if you want to get that number from `baz` property, you should call that function like this `arguments[0].call(foo)`. In `call` or `apply` methods first argument is execution scope.

---

## Example 7: Taking It From The Sibling

```
var foo = {
  bar: function(){ return this.baz; },
  baz: 1
}
typeof foo.bar();
```

--

### Possible answers

- "undefined"
- "object"
- "number"
- "function"

---

## Answer

It is `"number"` because when you call a function of an object in a chain manner like `foo.bar()` then `foo` acts like an pointer for function execution context.

---

## Example 8: Don't Act Like You Don't Know Me

```
var foo = {
  bar: function(){ return this.baz; },
  baz: 1
}
typeof (f = foo.bar)();
```

--

### Possible answers

-  "undefined"
- "object"
- "number"
- "function"

---

## Answer

`"undefined"`. Because while assigning `foo.bar` to `f` `bar` function lost its original execution context (`foo`).

---

## Example 9: Why Do You Wear A Same Dress Like Me, Bitch?!

```
(function f(){
  function f(){ return 1; }
  return f();
  function f(){ return 2; }
})();
```

--

### Possible answers

- 1
- 2
- Error (e.g. "Too much recursion")
- undefined

---

## Answer

Two. Because inside function's body priority for names have local vars and arguments.
Also, `function f() { return 1; }` was automatically hoisted at the beginning of the scope but then the another function with same name came and was also hoisted at the beginning of the scope and overrided the first one. EVENT AFTER RETURN STATEMENT!!1!

---

## Example 10: The dirtiest Secret In The Family

```
NaN == NaN
```

--

### Possible answers

- true
- false

---

## Answer

It is `false` by design of IEEE-754 committee (that decided on how floats and integers should work in computers).

Follow this logic:

`Math.sqrt(4) != Math.sqrt(16)`

In school mathematics you can't square root minus numbers and in operation `Math.sqrt(-4)` you would get `NaN`. In higher level math the result of minus squared numbers are called "imaginary numbers" and following would be also true `Math.sqrt(-4) != Math.sqrt(-16)`.

So this behavior of `NaN` prevents terrible calculation errors.

---


```

      ∩＿＿＿∩
     |ノ      ヽ
    /   ●    ● | Thanks!
   |     (_●_) ミ
  彡､     |∪|  ､｀＼
/ ＿＿    ヽノ /´>   )
(＿＿＿）     /  (_／
  |        /
  |   ／＼  ＼
  | /     )   )
   ∪     （   ＼
           ＼＿)



```
