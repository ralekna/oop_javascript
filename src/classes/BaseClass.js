/**
 * Created by rytis on 2015-04-24.
 */
define('classes/BaseClass', function() {

  function BaseClass () {
    // console.log('in constructor', this);
    if (this == window) {
      return new BaseClass();
    }
  }

  BaseClass.prototype = {
    doSomething: function () {

    }
  };

  return BaseClass;

});
