# string-formatter

<a href="https://travis-ci.org/garberus/string-formatter" target="_blank"><img src="https://travis-ci.org/garberus/string-formatter.svg" data-bindattr-145="145" title="Build Status Images"></a>

Utility function that will take a string with placeholders and replace those
placeholders with strings provided as an array. The index of the placeholders
correspond to the order of the string array.

## Sample usage

`format("Everything's {0}, Cap'n. Not to fret.", 'shiny');`

// "Everything's shiny Cap'n. Not to fret."

`format("The hero of {1}, the man they call {0}.", ['Jayne', 'Canton']);`

// "The hero of Canton, the man they call Jayne."

`format("Take my {0}, take my {1}. Take me where I cannot {2}.", ['love', 'land', 'stand']);`

// "Take my love, take my land. Take me where I cannot stand."
