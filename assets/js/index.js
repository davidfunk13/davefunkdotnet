//run these on pageload to set up dom.
generateSections();
changeBackgroundColor();

//attach a listener to the scroll event to refire the background changing function
window.addEventListener('scroll', function () {
    changeBackgroundColor();
});

window.addEventListener('resize', function () {
    generateSections();
    changeBackgroundColor();
});