define(function () {
  'use strict';

  describe('Explanation of functions and difference between their declaration', function() {

    function SomeFunction1 () {}

    var SomeFunction2 = function () {};

    var SomeFunction3 = function SomeFunction__3() {};

    it('SomeFunction1 has to have `name` property defined while SomeFunction2 not', function () {
      expect(SomeFunction1.name).toEqual('SomeFunction1');
      expect(SomeFunction2.name).toEqual('');
      expect(SomeFunction3.name).toEqual('SomeFunction__3');
    });

  });

  describe('Functions declared with named signature `function FunctionName() {}` are declared at the beginning of the scope', function() {

    it('should be an error thrown when trying to call non hoisted function', function () {

      expect(function () {

        (function(){ some(); })(); // self executing clojure

        var some = function() {};
      }).toThrowError(TypeError);

    });

    it('should be an error thrown when trying to call non hoisted function too', function () {
      expect(function() {

        (function(){ some(); })();

        var some = function some(){}; // adding name to function expression doesn't help

      }).toThrowError(TypeError);
    });

    it('function should return normally', function () {
      expect(function() {

        (function(){ some(); })();

        function some(){}

      }).not.toThrowError(TypeError);
    });

  });

  describe('Explanation of objects and functions basics', function () {

    var MyObject = { myProp: 'Something'};

    // just empty function
    var MyClass = function() {};

    it('should throw TypeError when trying to construct new object by using `new` statement', function () {
      expect(function () { new MyObject(); }).toThrowError(TypeError);
    });

    it('should normally create instance of MyClass by using statement `new`', function () {

      expect( new MyClass()).toEqual(jasmine.any(MyClass));
      // in other words
      expect( (new MyClass()) instanceof MyClass).toBeTruthy();
      expect( (new MyClass()).constructor).toEqual(MyClass);
      expect( (new MyClass()).constructor.prototype).toEqual(MyClass.prototype);

    });

  });

  describe('Explanation of `this` keyword', function () {

    describe('`this` keyword is a special pointer in a function that holds a reference to an object on which function is called on', function (){

      it('`this` should point to String \"Hello\"', function () {

        function helloCheck () {
          expect(this).toEqual('Hello');
        }

        helloCheck.apply('Hello');
      });

      it('`this` should be `undefined` in all five cases', function () {

        function nullCheck () {
          expect(this).toBeUndefined();
        }

        nullCheck();
        nullCheck.apply(undefined);
        nullCheck.apply();
        nullCheck.call(undefined);
        nullCheck.call();
      });

    });

  });

  describe('Explanation of prototype', function() {

    describe('during construction of object with constructor a new plain objects is created ', function() {
      it('should create an object with a prototype wihtout using new keyword', function () {
        var some;
        function Some() {
          expect(this.constructor).toBe(Some);
          expect(this).toBe(some);
        }
        Some.prototype.hello = function () {};
        some = {};
        some.__proto__ = Some.prototype;
        Some.apply(some);
      });

    });

  });

});
