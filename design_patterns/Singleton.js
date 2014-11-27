var Singleton = (function() {

  var instance;
  var creatingSingletonInstance = false;

  Singleton.getInstance = function() {
    if (!instance) {
      creatingSingletonInstance = true;
      instance = new Singleton();
      creatingSingletonInstance = false;
    }
    return instance;
  };

  // constructor
  function Singleton() {
    // this prevents using constructor directly
    if (!creatingSingletonInstance) {
      throw Error('You can\'t directly create instance of this class. Use Singleton.getInstance() method!');
    }
  }

  return Singleton;

})();
