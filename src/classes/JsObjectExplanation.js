/**
 * Created by rytis on 2014-12-02.
 */
var Some = {
  myMethod: function () {
    console.log('My text');
  }
};


// var someInstance = new Some(); // << TypeError: object is not a function
// someInstance.myMethod();

var Other = function(){
  console.log('In constructor 0');
};

Other.constructor = function () {
  console.log('In constructor');
};

Other.prototype = {
  myMethod: function () {
    console.log('My text');
  }
};

var otherInstance = new Other();
otherInstance.myMethod();
