function SimplestClass (someArgument) {

  var privateInstanceVariable = "I\'m accessible only through getters and setters";

  this.getPrivateInstanceVariable = function() {
    return privateInstanceVariable;
  };

  this.setPrivateInstanceVariable = function(value) {
    privateInstanceVariable = value;
  };

  this.publicInstanceVariable = someArgument;

  // this type of class is not suitable for static members because these members are redefined every time on new instance creation
  SimplestClass.PUBLIC_STATIC_MEMBER = "I\'m public static but overridden every time on new instance creation";

  // you can work around that by checking if it's not already defined but that's ugly, isn't it?
  if (typeof( SimplestClass.OTHER_STATIC_MEMBER ) === 'undefined') {
    SimplestClass.OTHER_STATIC_MEMBER = 'I won\'t change every time';
  }

}
