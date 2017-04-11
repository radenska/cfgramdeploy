'use strict';

module.exports = function() {
  return function(galleries, searchTerm) {
      let fuzzyRegex = makeFuzzyRegex(searchTerm);
      return galleries.filter(gallery => {
        return fuzzyRegex.test(gallery.name.toUpperCase()) || fuzzyRegex.test(gallery.desc.toUpperCase());
      });
  };
};

function makeFuzzyRegex(input) {
  if (!input) return /.*/;
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
}
