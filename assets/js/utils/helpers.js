function generateSections() {
    sectionCollection.length = 0;

    sectionSelectors.forEach((_, i) => {
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
        const svg = _.querySelector('svg.svg-heading');
        const rect = _.querySelector('rect.svg-heading.rect');
        const text = _.querySelector('text.svg-heading.text');

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
            sectionSelector,
            svg,
            rect,
            text
        };

        sectionCollection.push(newSection);
    });
}