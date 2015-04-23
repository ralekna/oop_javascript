/**
 * Created by rytis on 2015-04-23.
 */
var FullClass = require('classes/FullClass');

describe('FullClass should demonstrate some common class features', function () {

  it('should be that public static properties are accessible', function () {
    expect(FullClass.DEFAULTS_CONSTANT).toBe("This is a default value");
  });

});
