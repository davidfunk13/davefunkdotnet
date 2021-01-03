//selectors;
const sectionOne = document.querySelector('section.section.section__1');
const sectionTwo = document.querySelector('section.section.section__2');
const sectionThree = document.querySelector('section.section.section__3');
const sectionFour = document.querySelector('section.section.section__4');

// references to top of elements in selectors
const sectionOneTop = sectionOne.getBoundingClientRect().top;
const sectionTwoTop = sectionTwo.getBoundingClientRect().top;
const sectionThreeTop = sectionThree.getBoundingClientRect().top;
const sectionFourTop = sectionFour.getBoundingClientRect().top;

// height of document in pixels
const height = document.body.scrollHeight;

// height refs, unecessary, but makes me feel safer than 
// dividing total height by four
const sectionHeight = height / 4;
const sectionOneHeight = sectionOne.getClientRects()[0].height;
const sectionTwoHeight = sectionOne.getClientRects()[0].height;
const sectionThreeHeight = sectionOne.getClientRects()[0].height;
const sectionFourHeight = sectionOne.getClientRects()[0].height;

//wherever theres and end to a section, we'll subtract a quarter of that
// sections height to get our animation trigger. 
const padding = sectionHeight / 4;

//heres where we trigger the animations
const sectionOneTriggerLocation = sectionHeight - padding;
const sectionTwoTriggerLocation = (sectionHeight * 2) - padding;
const sectionThreeTriggerLocation = (sectionHeight * 3) - padding;
const sectionFourTriggerLocation = (sectionHeight * 4) - padding;

window.addEventListener('scroll', function () {
    const currentY = window.pageYOffset;

    if (currentY >= sectionOneTriggerLocation && currentY < sectionHeight) {
        console.log('section 1');
    }

    if (currentY >= sectionTwoTriggerLocation && currentY < (sectionHeight * 2)) {
        console.log('section 2');
    }

    if (currentY >= sectionThreeTriggerLocation && currentY < (sectionHeight * 3)) {
        console.log('section 3');
    }
});
