define('classes/ExtendedClass', ['classes/BaseClass'], function(BaseClass) {

  function ExtendedClass () {
  }

  ExtendedClass.prototype = new BaseClass();

  return ExtendedClass;

});
