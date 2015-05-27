/**
 * Created by rytis on 2014-12-02.
 */
var ExampleClass = (function() {

  function ExampleClass() {

  }

  ExampleClass.prototype = {

    some: function () {

    }

  };

  return ExampleClass;

})();


var ex1 = new ExampleClass();
var ex3 = new ExampleClass();

ex1.some(); // will trace 'My text'
ex3.some(); // will trace 'My text'

ex3.some = function() {

};

ex3.some(); // will trace 'My custom text'

// redefining method some in prototype
ExampleClass.prototype.some = function () {

};

var ex2 = new ExampleClass();

ex1.some(); // will trace 'My other text'
ex2.some(); // will trace 'My other text'
ex3.some(); // will trace 'My custom text'
