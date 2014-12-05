// this a class and a constructor itself
function SimplestClass (someArgument) {

  var privateInstanceVariable = "I\'m accessible only through getters and setters";

  this.getPrivateInstanceVariable = function() {
    return privateInstanceVariable;
  };

  this.setPrivateInstanceVariable = function(value) {
    privateInstanceVariable = value;
  };

  this.publicInstanceVariable = someArgument;

  // do NOT declare static vars in here because they will be overriden everytime on new instance creation
  SimplestClass.PUBLIC_STATIC_MEMBER = "I\'m public static but overridden every time on new instance creation";

  // and do NOT do this either
  // you can work around that by checking if it's not already defined but that's ugly, isn't it?
  if (typeof( SimplestClass.OTHER_STATIC_MEMBER ) === 'undefined') {
    SimplestClass.OTHER_STATIC_MEMBER = 'I won\'t change every time';
  }

}

// public static vars can be declared outside constructor
SimplestClass.OTHER_STATIC_MEMBER = 'You can safely declare static vars here';

// you can't have private static vars with this class
