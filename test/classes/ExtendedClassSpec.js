/**
 * Created by rytis on 2015-04-24.
 */
define(['classes/BaseClass', 'classes/ExtendedClass'], function (BaseClass, ExtendedClass) {

  describe('There should be demonstrated extensions of classes', function () {

    it('should show that child class is instance of base class', function () {
      expect(new ExtendedClass()).toEqual(jasmine.any(BaseClass));
      // or in other words
      expect((new ExtendedClass()) instanceof BaseClass).toBe(true);
    });

  });

});
