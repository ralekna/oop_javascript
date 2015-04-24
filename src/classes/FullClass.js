module.export = (function() {
  
  ///
  /// STATIC MEMBERS
  ///
  // It is a good practice to declare static members before non static
  
  // private static variables are accessible through static and instance methods but not directly from outside
  var privateStaticVariable = "I\'m private static!";
  
  // Public static class methods
  FullClass.getPrivateStaticVariable = function() {
    return privateStaticVariable;
  };
  
  // Public static variables
  // Have in mind that these variables can be easily changed by accident.
  FullClass.publicStaticVar = "I\'m static and public!";
  
  // It is used to declare constants in this scope
  FullClass.DEFAULTS_CONSTANT = "This is a default value";
  
  // Private static methods
  // These methods are good for various utility functions
  var privateStaticMethod = function() {
    // it can access both private and public static variables and methods

  };
  
  // class constructor
  // It is recommended to declare constructor as function instead of closure ( var FullClass = function() {}; )
  // because it is declared immediately in it's scope before all other declarations
  function FullClass(someArgument) {
    
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
    this.publicInstanceVariable = someArgument;
    
  }  
  
  // in prototype you define or override public instance variables and methods that will common to all instances of class
  FullClass.prototype = {
    
    // public instace variable
    // Variables declared here is also accessible in constructor.
    myPublicVar: "I\'m public too!",
    
    // Event if set variable's value in constructor, it is a good practice to declare them here
    publicInstanceVariable: null,
    
    // You can set instance variables' values to static vars' values 
    anotherInstanceVariable: FullClass.DEFAULTS_CONSTANT,
    thirdInstanceVariable: privateStaticVariable,
    
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
    },
    
    // from public instance methods you can easily access private static vars and methods
    getPrivateStaticVar: function() {
      return privateStaticVariable;
    }

  };
  
  // It is important to return Class constructor's closure
  return FullClass;

})();
