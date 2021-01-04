// these will be picked up dynamically, put in an array so they arent hard coded and respond when i add a new section
// to the html
const sectionOne = document.querySelector('section.section.section__1');
const sectionTwo = document.querySelector('section.section.section__2');
const sectionThree = document.querySelector('section.section.section__3');
const sectionFour = document.querySelector('section.section.section__4');

// height of entire document in pixels
const height = document.body.scrollHeight;

// height ref. int is number of sections. (this will be subbed with sections array.length)
const sectionHeight = height / 4;

//these represent the end of each section, will also be generated dynamcially from sections array.
const endOfSectionOne = sectionHeight;
const endOfSectionTwo = (sectionHeight * 2);
const endOfSectionThree = (sectionHeight * 3);

// isolate the last third of a given sections height, or half or quarter whatever in pixels. 
const padding = sectionHeight / 3;

//heres where we trigger the animations. subtracting the padding variable from the section gives us
// a location to trigger the start of the background fade in pixels
const sectionOneTrigger = endOfSectionOne - padding;
const sectionTwoTrigger = endOfSectionTwo - padding;
const sectionThreeTrigger = endOfSectionThree - padding;

function changeBackgroundColor() {
    const currentY = window.pageYOffset;

    console.log({ currentY, sectionTwoTrigger, endOfSectionTwo });

    //first section
    if (currentY < sectionOneTrigger) {
        document.body.style.backgroundColor = 'rgb(32, 65, 142)';
    }

    if (currentY < endOfSectionOne && currentY > sectionOneTrigger) {
        const scale = chroma.scale(['rgb(32, 65, 142)', 'rgb(39, 41, 50)']).domain([sectionOneTrigger, sectionHeight]);

        document.body.style.backgroundColor = scale(currentY);
    }

    if (currentY > endOfSectionOne && currentY < sectionTwoTrigger) {
        document.body.style.backgroundColor = `rgb(39, 41, 50)`;
    }

    if (currentY < endOfSectionTwo && currentY > sectionTwoTrigger) {
        const scale = chroma.scale(['rgb(39,41,50)', 'rgb(245, 143, 41)']).domain([sectionTwoTrigger, (sectionHeight * 2)]);
        document.body.style.backgroundColor = scale(currentY);
    }

    if (currentY > endOfSectionTwo && currentY < sectionThreeTrigger) {
        document.body.style.backgroundColor = `rgb(245, 143, 41)`;
    }

    if (currentY < endOfSectionThree && currentY > sectionThreeTrigger) {
        const scale = chroma.scale(['rgb(245, 143, 41)', 'rgb(130, 132, 137)']).domain([sectionThreeTrigger, (sectionHeight * 3)]);
        document.body.style.backgroundColor = scale(currentY);
    }
};

window.onload = function () {
    console.log('loaded')
    changeBackgroundColor();
}

window.addEventListener('scroll', function () {
    console.log('scroll')
    changeBackgroundColor()
});

// resize listener for recalculating
// window.addEventListener('resize', function () {
//     console.log({ width: window.innerWidth, height: window.innerHeight, currentY })
// });