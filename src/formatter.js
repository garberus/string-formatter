'use strict';

/**
 * Function that will take a string with placeholders and replace those
 * placeholders with strings provided as an array. The index of the placeholders
 * correspond to the order of the string array.
 * @param {string} str The string with placeholders.
 * @param {string|Array} args The strings to replace with (or an array thereof).
 * @returns {string}
 *
 * @example
 *    format("Everything's {0}, Cap'n. Not to fret.", 'shiny')
 *        // "Everything's shiny Cap'n. Not to fret."
 *
 *    format("The hero of {1}, the man they call {0}.", ['Jayne', 'Canton'])
 *        // "The hero of Canton, the man they call Jayne."
 *
 *    format("Take my {0}, take my {1}. Take me where I cannot {2}.",
 *        ['love', 'land', 'stand'])
 *        // "Take my love, take my land. Take me where I cannot stand."
 */

var format = function format(str, args) {

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
  } else {
    replacers = args;
  }

  // Find occurrences of { and }.
  if (str.split('{').length !== str.split('}').length) {
    throw new Error('Syntax error.');
  }

  // Find the number of placeholders.
  for (i = 0, l = (str.split('{').length - 1); i < l; i++) {
    placeholders.push('{'+ i +'}');
  }

  // If there isn't enough replacers, throw error.
  if (placeholders.length > replacers.length) {
    throw new Error('Insufficient number of arguments supplied. Expected '+
        placeholders.length +'.');
  }

  // Start doing replace operations.
  for (i = 0, l = placeholders.length; i < l; i++) {
    if (!(typeof replacers[i] === 'string' || typeof replacers[i] === 'number')) {
      throw new Error('The arguments to this function must be strings or numbers.');
    }
    str = str.replace(placeholders[i], replacers[i]);
  }

  // Return replaced string.
  return str;
};

if (exports) {
  exports.format = format;
}
