/*jslint node: true*/

'use strict';

var expect = require('expectacle');
var formatter = require('../formatter.js');

describe('Formatter', function() {

  describe('negative tests', function() {

    it('should fail if the first argument is not a string', function() {
      expect(formatter.format.bind(formatter, 42, 'Jayne'))
          .toThrow('The first argument must a be string.');
    });

    it('should protest if the arguments index order isn\'t respected', function() {
      expect(formatter.format.bind(formatter, 'The hero of Canton, the man they call {1}.', 'Jayne'))
          .toThrow('Invalid argument index detected.');
    });

    it('should protest if the arguments index count is bigger than the supplied arguments array', function() {
      expect(formatter.format.bind(formatter, 'The hero of {0}, the man they call {1}.', 'Jayne'))
          .toThrow('Insufficient number of arguments supplied. Expected 2.');
    });

    it('should only support strings or numbers in the arguments array', function() {
      expect(formatter.format.bind(formatter, 'The hero of {0}, the man they call {1}.', [{foo:'bar'}, 'Jayne']))
          .toThrow('The arguments to this function must be strings or numbers.');
    });

    it('should react if the input string is malformed', function() {
      expect(formatter.format.bind(formatter, 'The hero of {0, the man they call {1}.', 'Jayne'))
          .toThrow('Syntax error.');
      expect(formatter.format.bind(formatter, 'The hero of {0}, the man they call {1.', 'Jayne'))
          .toThrow('Syntax error.');
    });

    it('should silently parse if the arguments array is bigger than the supplied indices', function() {
      expect(formatter.format('The hero of Canton, the man they call {0}.', ['Jayne', 'Cobb']))
          .toBe('The hero of Canton, the man they call Jayne.');
    });

  });

  describe('replace functionality', function() {

    it('should always return a string', function() {
      expect(formatter.format('The hero of Canton, the man they call Jayne.'))
          .toBeString();
    });

    it('should replace the placeholder in a string by supplying a string argument', function() {
      expect(formatter.replace('The hero of Canton, the man they call {0}.', 'Jayne'))
          .toBe('The hero of Canton, the man they call Jayne.');
    });

    it('should replace the placeholder in a string by supplying an array argument', function() {
      expect(formatter.format('The hero of Canton, the man they call {0}.', ['Jayne']))
          .toBe('The hero of Canton, the man they call Jayne.');
    });

    it('should replace all placeholders in a string by supplying an array of arguments', function() {
      expect(formatter.format('Take my {0}, take my {1}. Take me where I cannot {2}.',
              ['love', 'land', 'stand']))
          .toBe('Take my love, take my land. Take me where I cannot stand.');
    });

    it('The order of indices shouldn\'t matter as long as they are sequential', function() {
      expect(formatter.format('Take my {1}, take my {0}. Take me where I cannot {2}.',
              ['land', 'love', 'stand']))
          .toBe('Take my love, take my land. Take me where I cannot stand.');
    });

  });

});