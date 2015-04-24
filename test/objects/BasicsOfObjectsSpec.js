define(function () {

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
      }).toThrow(new TypeError('undefined is not a function'));

    });

    it('should be an error thrown when trying to call non hoisted function too', function () {
      expect(function() {

        (function(){ some(); })();

        var some = function some(){} // adding name to function expression doesn't help

      }).toThrow(new TypeError('undefined is not a function'));
    });

    it('function should return normally', function () {
      expect(function() {

        (function(){ some(); })();

        function some(){}

      }).not.toThrow(new TypeError('undefined is not a function'));
    });

  });

  describe('Explanation of objects and functions basics', function () {

    var MyObject = { myProp: 'Something'};

    // just empty function
    var MyClass = function() {};

    it('should throw TypeError when trying to construct new object by using `new` statement', function () {
      expect(function () { new MyObject(); }).toThrow( new TypeError("object is not a function"));
    });

    it('should normally create instance of MyClass by using statement `new`', function () {

      expect( new MyClass()).toEqual(jasmine.any(MyClass));
      // in other words
      expect( (new MyClass()) instanceof MyClass).toBeTruthy();
      expect( (new MyClass()).constructor).toEqual(MyClass);
      expect( (new MyClass()).constructor.prototype).toEqual(MyClass.prototype);

    });

  });

  describe('Explanation of prototype', function() {



  });

});
