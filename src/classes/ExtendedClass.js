var BaseClass  = (function() {

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
/**
 * Created by rytis on 2014-12-05.
 */
var ExtendedClass = (function() {

  function ExtendedClass() {

  }

  ExtendedClass.prototype = {

  };

  return ExtendedClass;

})();

