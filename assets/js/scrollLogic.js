//all section elements on html documnet
const sectionSelectors = document.querySelectorAll('section');

// when attributes are assigned to section objects they will end up here
const sectionCollection = [];

//array of colors for each section, will possibly randomize these and add extras.
const colors = ['rgb(32, 65, 142)', 'rgb(39, 41, 50)', 'rgb(245, 143, 41)', 'rgb(130, 132, 137)'];

// height of entire document in pixels
const height = document.body.scrollHeight;

// height ref. int is number of sections. (this will be subbed with sections array.length)
const sectionHeight = height / sectionSelectors.length;

// isolate the last third of a given sections height, or half or quarter whatever in pixels. 
const padding = sectionHeight / 3;

//on page load we create our sections from the markup.
function generateSections() {
    sectionSelectors.forEach((_, i) => {
        //implement random colors by randomizing array itself, then padding those in.

        const sectionColor = colors[i];
        const sectionNextColor = colors[i + 1] || 'rgb(255, 255, 255)';
        const sectionTrigger = sectionHeight * (i + 1) - padding;
        const sectionNumber = i + 1;
        const sectionStart = sectionHeight * i;
        const sectionEnd = sectionHeight * (i + 1);
        const sectionTransitionScale = chroma.scale([sectionColor, sectionNextColor])

        //set range of color scale to be between the pixel ranges we need it to be depending on the section
        sectionTransitionScale.domain([sectionTrigger, sectionEnd]);

        const newSection = {
            sectionColor,
            sectionNextColor,
            sectionTrigger,
            sectionNumber,
            sectionStart,
            sectionEnd,
            sectionTransitionScale
        };

        sectionCollection.push(newSection);
    });

}

// this function will be called by an event listener boud to scrolling.
function changeBackgroundColor() {
    const currentY = window.pageYOffset;

    sectionCollection.map((section) => {
        if (currentY <= section.sectionEnd) {
            if (currentY >= section.sectionTrigger) {
                return document.body.style.backgroundColor = section.sectionTransitionScale(currentY);
            }

            if (currentY >= section.sectionStart && currentY < section.sectionTrigger) {
                return document.body.style.backgroundColor = section.sectionColor;
            }
        }
    });
};

//run these on pageload to set up dom.
generateSections();
changeBackgroundColor();

//attach a listener to the scroll event to refire the background changing function
window.addEventListener('scroll', function () {
    changeBackgroundColor();
});