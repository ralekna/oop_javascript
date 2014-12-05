/**
 * Created by rytis on 2014-12-05.
 */

function SimplestClass() {

  this.myProperty = 'hello';

}

var ExampleClass = (function() {

  function ExampleClass () {

  }

  ExampleClass.prototype = {
  };

  return ExampleClass;

})();

var OtherExampleClass = (function() {

  function OtherExampleClass (myParam) {
      this.myParam = myParam;
  }

  OtherExampleClass.prototype = {
    showMyParam: function () {
      console.log(this.myParam);
    }
  };

  return OtherExampleClass;

})();

// most straightforward method to create class instance
var exampleClassInstance = new ExampleClass();

// it is possible to create instance without braces, but recommended for readability
var exampleClassInstance2 = new ExampleClass;

// THIS WONT WORK!!!
var exampleClassInstance3 = ExampleClass();
