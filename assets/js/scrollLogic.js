//all section elements on html documnet
const sectionSelectors = document.querySelectorAll('section');

// when attributes are assigned to section objects they will end up here
const sectionCollection = [];

//array of colors for each section, will possibly randomize these and add extras.
const colors = ['rgb(32, 65, 142)', 'rgb(39, 41, 50)', 'rgb(245, 143, 41)', 'rgb(130, 132, 137)'];

// height of entire document in pixels
const height = document.body.scrollHeight;

// just easier to set up sections this way. also might be handy for infividual and all properties.
class Section {
    constructor(sectionColor,
        sectionNextColor,
        sectionTrigger,
        sectionNumber,
        sectionStart,
        sectionEnd,
        sectionTransitionScale
    ) {
        this.sectionColor = sectionColor;
        this.sectionNextColor = sectionNextColor;
        this.sectionTrigger = sectionTrigger;
        this.sectionNumber = sectionNumber;
        this.sectionStart = sectionStart;
        this.sectionEnd = sectionEnd;
        this.sectionTransitionScale = sectionTransitionScale;
    }
}

// height ref. int is number of sections. (this will be subbed with sections array.length)
const sectionHeight = height / sectionSelectors.length;

// isolate the last third of a given sections height, or half or quarter whatever in pixels. 
const padding = sectionHeight / 3;

//on page load we create our sections from the markup.
function generateSections() {
    if (!sectionSelectors) {
        console.error('no sections found.');
    }

    sectionSelectors.forEach((section, i) => {
        //implement random colors by randomizing array itself, then padding those in.;
        const sectionColor = colors[i];
        const sectionNextColor = colors[i + 1] || 'rgb(255, 255, 255)';
        const sectionTrigger = sectionHeight * (i + 1) - padding;
        const sectionNumber = i + 1;
        const sectionStart = sectionHeight * i;
        const sectionEnd = sectionHeight * (i + 1);
        const sectionTransitionScale = chroma.scale([sectionColor, sectionNextColor]).domain([sectionTrigger, sectionEnd]);

        const newSection = new Section(sectionColor, sectionNextColor, sectionTrigger, sectionNumber, sectionStart, sectionEnd, sectionTransitionScale);
        sectionCollection.push(newSection);
    });

}

// this function will be called by an event listener boud to scrolling. It will iterate through the sections 
// tofigure out where we are and what color our background should be;
function changeBackgroundColor() {
    const currentY = window.pageYOffset;

    sectionCollection.map((section, i) => {
        console.log({
            currentY,
            start: section.sectionStart,
            end: section.sectionEnd,
            trigger: section.sectionTrigger
        });

        if (currentY <= section.sectionEnd && currentY >= section.sectionTrigger) {
            console.log('hit');
            const scale = chroma.scale([section.sectionColor, section.sectionNextColor]).domain([section.sectionTrigger, section.sectionEnd]);

            return document.body.style.backgroundColor = scale(currentY);
        }

    });

};

generateSections();

changeBackgroundColor();

window.addEventListener('scroll', function () {
    changeBackgroundColor();
});