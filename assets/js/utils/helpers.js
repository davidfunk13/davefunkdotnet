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
        const sectionTransitionScale = chroma.scale([sectionColor, sectionNextColor]);
        const sectionSelector = _;
        //set range of color scale to be between the pixel ranges we need it to be depending on the section
        sectionTransitionScale.domain([sectionTrigger, sectionEnd]);

        const newSection = {
            sectionColor,
            sectionNextColor,
            sectionTrigger,
            sectionNumber,
            sectionStart,
            sectionEnd,
            sectionTransitionScale,
            sectionSelector
        };

        sectionCollection.push(newSection);
    });
}

//this function will perform a linear transform of two mapped sets of integers based off current Y position.
//used to manipulate stroke-dashoffset values to draw svg in and out relative to scroll.
function drawSvg(t, a, b, c, d) {
    return c + ((d - c) / (b - a)) * (t - a);
}

// this function will be called by an event listener boud to scrolling.
function changeBackgroundColor() {
    const currentY = window.pageYOffset || window.scrollY;

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

function getElementY(el) {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = el.getBoundingClientRect();
    return elemRect.top - bodyRect.top;
}

function drawTitle(el, options) {
    const text = el.children[0].querySelector('svg').querySelector('text');
    const rect = el.children[0].querySelector('svg').querySelector('rect');

    const { startY, endY } = options;

    const currentY = window.pageYOffset || window.scrollY;

    console.log({ hasT2TextClass, hasT2RectClass })

    if (currentY <= startY && currentY <= endY) {
        if (hasT2RectClass) {
            rect.classList.remove('drawRect');
            rect.classList.add('drawRectOut');
            hasT2RectClass = false;
        }

        if (hasT2TextClass) {
            text.classList.remove('drawText')
            text.classList.add('drawTextOut')
            hasT2TextClass = false;
        }
    }

    if (currentY >= startY && currentY <= endY) {
        if (!hasT2RectClass) {
            rect.classList.remove('drawRectOut');
            rect.classList.add('drawRect');
            console.log('hit')
            hasT2RectClass = true;
        }

        if (!hasT2TextClass) {
            text.classList.remove('drawTextOut')
            text.classList.add('drawText')
            hasT2TextClass = true;
        }
    }

    if (currentY >= startY && currentY >= endY) {
        if (hasT2RectClass) {
            rect.classList.remove('drawRect');
            rect.classList.add('drawRectOut');
            hasT2RectClass = false;
        }

        if (hasT2TextClass) {
            text.classList.remove('drawText')
            text.classList.add('drawTextOut')
            hasT2TextClass = false;
        }
    }
}


