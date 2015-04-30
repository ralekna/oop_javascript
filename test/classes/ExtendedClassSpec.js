define(function () {

  var BaseClass = (function() {

    function BaseClass () {
      console.log('in constructor', this);
      if (this == window) {
        return new BaseClass();
      }
    }

    BaseClass.prototype = {
      doSomething: function () {
        console.log('hey');
      }
    };

    return BaseClass;

  })();

  var ExtendedClass = (function(__super) {

    // constructor
    function ExtendedClass () {
      // calling super constructor
      __super.apply(this, arguments);
    }

    ExtendedClass.prototype = new __super(); // assign prototype of parent class
    ExtendedClass.constructor = ExtendedClass; // reassign constructor because it was overridden when new prototype assigned

    return ExtendedClass;

  })(BaseClass);

  describe('There should be demonstrated extensions of classes', function () {

    it('should show that child class is instance of base class', function () {
      expect(new ExtendedClass()).toEqual(jasmine.any(BaseClass));
      // or in other words
      expect((new ExtendedClass()) instanceof BaseClass).toBe(true);
    });

  });

  describe('About constructor', function() {

    it('constructors should be not the same', function () {
      expect(BaseClass.constructor).not.toEqual(ExtendedClass.constructor);
    });

  });

});
