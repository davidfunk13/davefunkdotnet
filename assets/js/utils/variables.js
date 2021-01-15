// when attributes are assigned to section objects they will end up here
const sectionCollection = [];

//array of colors for each section, will possibly randomize these and add extras.
const colors = ['rgb(32, 65, 142)', 'rgb(39, 41, 50)', 'rgb(245, 143, 41)', 'rgb(130, 132, 137)'];

// height of entire document in pixels
// const height = document.body.scrollHeight;
const height = (document.height !== undefined) ? document.height : document.body.offsetHeight;

// height ref. int is number of sections. (this will be subbed with sections array.length)
const sectionHeight = height / sectionSelectors.length;

// isolate the last third of a given sections height, or half or quarter whatever in pixels. 
const padding = sectionHeight / 3;
