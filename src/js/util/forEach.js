/**
 * Loop over array and return each iteration to process through callback function
 *  @param {Array} arr
 *  @param {Function} callback
 */

var forEach = function(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
};

module.exports = forEach;
