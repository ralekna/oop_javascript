/**
 * Created by rytis on 2014-12-02.
 */

var PrototypeExample = (function () {

  function PrototypeExample() {
    this.myChangingDate = new Date();
  }

  PrototypeExample.prototype = {
    myPermanentDate: new Date(), // <<< this property is defined and assigned with value once during prototype definition and NOT everytime on object creation
    myChangingDate: null // property is defined but no value assigned
  };

  return PrototypeExample;

})();

//

var ex1 = null;
var ex2 = null;

setTimeout(function() {
  ex1 = new PrototypeExample();
  console.log('ex1.myPermanentDate', ex1.myPermanentDate.getTime());
  console.log('ex1.myChangingDate', ex1.myChangingDate.getTime());
}, 1000);

setTimeout(function() {
  ex2 = new PrototypeExample()
  console.log('ex2.myPermanentDate', ex2.myPermanentDate.getTime());
  console.log('ex2.myChangingDate', ex2.myChangingDate.getTime());

  // compare
  console.log('ex1.myPermanentDate.getTime() == ex2.myPermanentDate.getTime()', ex1.myPermanentDate.getTime() == ex2.myPermanentDate.getTime()); // will return true
  console.log('ex1.myChangingDate.getTime() == ex2.myChangingDate.getTime()', ex1.myChangingDate.getTime() == ex2.myChangingDate.getTime()); // will return false
}, 2000);
