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

//position
const titleOnePosition = getElementY(titleOne);
const titleTwoPosition = getElementY(titleTwo);
const titleThreePosition = getElementY(titleThree);
const titleFourPosition = getElementY(titleFour);

//dash
const titleStrokeOffsetStart = 2500;
const titleStrokeOffsetEnd = 0;

//drawTitle options 
const drawTitleStartPadding = 500;
const drawTitleEndPadding = 300;

let hasT2RectClass = false;
let hasT2TextClass = false;
let hasT3RectClass = false;
let hasT3TextClass = false;
let hasT4RectClass = false;
let hasT4TextClass = false;

const drawTitleTwoOptions = {
    startY: titleTwoPosition - drawTitleStartPadding,
    endY: titleTwoPosition + drawTitleEndPadding,
};