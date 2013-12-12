/*jslint node: true*/

'use strict';

var replace = function replace(str, args) {

  var i,l;

  // The array of strings to be swapped for the placeholders.
  var replacers = [];

  // The array with placeholders.
  var placeholders = [];

  // If the first argument is not a string, fail.
  if (!(typeof str === 'string')) {
    throw new Error('The first argument must a be string.');
  }

  // No placeholders to replace, just return string.
  if (!(new RegExp('{.}').test(str))) {
    return str;
  }

  // If the second argument is a string, add that to the array of replacers.
  if (typeof args === 'string') {
    replacers.push(args);
  }
  else if (!Array.isArray(args)) {
    throw new Error('Argument was not in the correct format.');
  }

  // Find occurrences of { and }.
  if (str.split('{').length !== str.split('}').length) {
    throw new Error('Syntax error.');
  }

  // Find the number of placeholders.
  for (i=0, l=str.split('{').length; i<l; i++) {
    placeholders.push('{'+ i +'}');
  }

  // If there isn't enough replacers, throw error.
  if (placeholders.length > replacers.length) {
    throw new Error('Insufficient number of arguments supplied. Expected '+
        placeholders.length +'.');
  }

  // Start doing replace operations.
  for (i=0, l=placeholders.length; i<l; i++) {
    str = str.replace(placeholders[i], replacers[i]);
  }

  // Return replaced string.
  return str;

};

if (exports) {
  exports.replace = replace;
}