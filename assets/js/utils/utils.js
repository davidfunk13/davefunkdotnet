// get the distance from the top of the document to the top of an element in pixels;
function getElementY(el) {
    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = el.getBoundingClientRect();

    return elemRect.top - bodyRect.top;
}

// //this function will perform a linear transform of two mapped sets of integers based off current Y position.
// //used to manipulate stroke-dashoffset values to draw svg in and out relative to scroll.
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