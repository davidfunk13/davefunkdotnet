
function changeBackgroundColor() {
    // this value is the distance from the top of the window to this element.
    // this value changes depending on your viewport position.
    const section1Top = document.querySelector('section.section.section__1').getBoundingClientRect().top;

    //presumably y coordinate position from page top?
    const scrollPosition = window.pageYOffset;
    console.log({ scrollPosition, section1Top });


}

window.addEventListener('scroll', function (e) {
    changeBackgroundColor();
});