var SomeClass = (function() {
  
  // private static variables are accessible through static and instance methods but not directly from outside
  var privateStaticVariable = "Something";

  // class constructor
  function SomeClass(some_argument) {
    
    // private instance variables
    // use them only when you realy need them because they don't go 
    // into prototype and that effects performance on some cases
    var privateInstanceVariable = "I\'m secret!";
    

    // private instance variables accessors
    this.getInstanceVariable = function () {
      return privateInstanceVariable;
    };

    this.setInstanceVariable = function (value) {
      privateInstanceVariable = value;
    };
  
    // Public instance variable.
    // You should declare public instance variables in constructor 
    // only when you need set or modify values based on parameters passed to constructor
    this.publicInstanceVariable = "I\'m public!";
    
  }
  
  // Static class methods
  SomeClass.getPrivateStaticVariable = function() {
    return privateStaticVariable;
  };

  // in prototype you define or override public instance variables and methods that will common to all instances of class
  SomeClass.prototype = {

    // in prototype you can access private instance variables only via getters and setters
    getSecretVariable: function() {
      return this.getInstanceVariable();
    },
    
    setSecretVariable: function(value) {
      this.setInstanceVariable(value);
    },

    // this will return undefined because private instance variables 
    // are not directly accesible by prototype functions
    getDirectHelloWithThis: function() {
      return this.privateInstanceVariable;
    },
    
    // calling this method will generate ReferenceError that will say "privateInstanceVariable is not defined"
    getDirectHello: function() {
      return privateInstanceVariable;
    }


  };
  
  // It is important to return Class constructor's closure
  return SomeClass;

})();
