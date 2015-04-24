/**
 * Created by rytis on 2015-04-23.
 */
define(['classes/FullClass'], function(FullClass) {

  describe('FullClass should demonstrate some common class features for static members', function() {

    it('should be that public static properties are accessible', function() {
      expect(FullClass.DEFAULTS_CONSTANT).toBe("This is a default value");
    });

    it('should be undefined because it is private static var', function(){
      expect(FullClass.privateStaticVariable).toBeUndefined();
      expect(FullClass.privateStaticMethod).toBeUndefined();
    });

    it('should be possible to get private static variable via public static getter', function() {
      expect(FullClass.getPrivateStaticVariable()).toBe('I\'m private static!');
    });

  });

});
