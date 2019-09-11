var assert = require('assert');
var deepEqual = require('../deepEqual');

describe('deepEqual', function() {
  it('should throw error if not enough arguments are passed', function () {
    assert.throws(() => {deepEqual()}, 'throws error when no arguments passed');
    assert.throws(() => {deepEqual({})}, 'throws error when one argument passed');
  });

  describe('Comparing Objects', function () {
    it('should detect absent properties', function() {
      var o1 = {
        a: 'something'
      };
      var o2 = {};

      assert.equal(deepEqual(o1, o2), false);

      // nested
      o1 = {
        f: {
          a: 'something'
        }
      };
      o2 = {
        f: {

        }
      };

      assert.equal(deepEqual(o1, o2), false, 'works on nested levels');
    });

    it('should handle null object properties gracefully', function() {
      var o1 = {
        f: {
          a: 'something'
        }
      };
      var o2 = {
        f: null
      };

      assert.doesNotThrow(() => {deepEqual(o1, o2)}, 'doesnt throw an error');
      assert.equal(deepEqual(o1, o2), false, 'returns false if theres a mismatch');

      o1 = {
        f: null
      };
      o2 = {
        f: {}
      };

      assert.doesNotThrow(() => {deepEqual(o1, o2)}, 'doesnt throw an error');
      assert.equal(deepEqual(o1, o2), false, 'returns false if theres a mismatch');

      o1 = {
        f: null
      };
      o2 = {
        f: null
      };

      assert.doesNotThrow(() => {deepEqual(o1, o2)}, 'doesnt throw an error');
      assert.equal(deepEqual(o1, o2), true, 'if property on both objects is null, returns true');

      o1 = null;
      o2 = null;

      assert.doesNotThrow(() => {deepEqual(o1, o2)}, 'doesnt throw an error');
      assert.equal(deepEqual(o1, o2), true, 'returns true if both objects are null');
    });
  });

  describe('Comparing Arrays', function () {
    it('should succeed if arrays match', function () {
      var o1 = {
        arr: [1,2,3,4,5]
      };
      var o2 = {
        arr: [1,2,3,4,5]
      };

      assert.equal(deepEqual(o1, o2), true);
    });

    it('should detect differing order', function() {
      var o1 = {
        arr: [1,2,3,4,5]
      };
      var o2 = {
        arr: [1,3,2,4,5]
      };

      assert.equal(deepEqual(o1, o2), false);
    });

    it('should deep-compare objects in an array', function () {
      var o1 = {
        arr: [
          {
            val: 'something',
            deepObject: {
              val2: 'something different'
            }
          }
        ]
      };
      var o2 = {
        arr: [
          {
            val: 'something',
            deepObject: {
              val2: 'something different'
            }
          }
        ]
      };

      assert.equal(deepEqual(o1, o2), true);

      o1 = {
        arr: [
          {
            val: 'something',
            deepObject: {
              val2: 'something different'
            }
          }
        ]
      };

      o2 = {
        arr: [
          {
            val: 'something',
            deepObject: {
              val2: 'something blah! this should fail'
            }
          }
        ]
      };

      assert.equal(deepEqual(o1, o2), false);
    });
  });
});