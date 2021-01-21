//on page load we create our sections from the markup.
function generateSections() {
    sectionSelectors.forEach((_, i) => {

        //implement random colors by randomizing array itself, then padding those in.
        const sectionNumber = i + 1;
        let titleToggle = false;
        const heightOfThisElement = _.getBoundingClientRect().height;
        const padding = heightOfThisElement / 3;
        const sectionColor = colors[i];
        const sectionNextColor = colors[i + 1] || 'rgb(255, 255, 255)';
        const sectionStart = getElementY(_);
        const sectionTrigger = (sectionStart + heightOfThisElement) - padding;
        const sectionEnd = sectionStart + heightOfThisElement;
        const sectionTransitionScale = chroma.scale([sectionColor, sectionNextColor]);
        const sectionSelector = _;

        //set range of color scale to be between the pixel ranges we need it to be depending on the section
        sectionTransitionScale.domain([sectionTrigger, sectionEnd]);

        const newSection = {
            titleToggle,
            sectionNumber,
            sectionColor,
            sectionNextColor,
            sectionTrigger,
            sectionStart,
            sectionEnd,
            sectionTransitionScale,
            sectionSelector
        };

        sectionCollection.push(newSection);
    });
}