define(function () {

  var BaseClass = (function() {

    function BaseClass () {
      this.doSomething();
    }

    BaseClass.prototype = {
      doSomething: function () {
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

    it('inherited methods are not cloned - they are reference original in super class', function () {

      var extendedClass = new ExtendedClass();
      expect(extendedClass.doSomething).toBe(BaseClass.prototype.doSomething);

    });

  });

  describe('About constructors', function() {

    it('constructors should be not the same', function () {
      expect(BaseClass.constructor).not.toEqual(ExtendedClass.constructor);
    });

    it('super constructor should be called', function () {

    });

  });

});
