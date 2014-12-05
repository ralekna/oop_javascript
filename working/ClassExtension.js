var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by rytis on 12/5/14.
*/
var BaseClass = (function () {
    function BaseClass(name) {
        // BaseClass.count++;
        this.name = name;
    }
    BaseClass.prototype.getName = function () {
        return this.name;
    };

    BaseClass.prototype.getMyPublicName = function () {
        return this.name;
    };

    BaseClass.prototype.doSomething = function () {
        console.log('hi');
    };

    BaseClass.increaseCount2 = function () {
        BaseClass.count2++;
    };
    BaseClass.count = 0;
    return BaseClass;
})();

var ChildClass = (function (_super) {
    __extends(ChildClass, _super);
    function ChildClass(myName) {
        _super.call(this, myName);
    }
    ChildClass.prototype.getMyName = function () {
        _super.prototype.doSomething.call(this);
        return this.getMyPublicName();
    };

    ChildClass.prototype.doSomething = function () {
        console.log('h0');
    };
    return ChildClass;
})(BaseClass);
//# sourceMappingURL=ClassExtension.js.map
