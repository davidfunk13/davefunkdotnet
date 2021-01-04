function changeBackgroundColor(currentY) {
    console.log({ currentY, sectionThreeTrigger, endOfSectionThree })
    console.log(currentY, sectionOneTrigger, sectionTwoTrigger, sectionThreeTrigger)
    if (currentY !== 0 && currentY < sectionOneTrigger) {
        document.body.style.backgroundColor = 'rgb(32, 65, 142)'
    }

    if (currentY === 0 || (currentY >= sectionOneTrigger && currentY < endOfSectionOne)) {
        console.log('section 1');
        const scale = chroma.scale(['rgb(32, 65, 142)', 'rgb(39, 41, 50)']).domain([sectionOneTrigger, sectionHeight]);

        document.body.style.backgroundColor = scale(currentY);
    }

    if (currentY >= sectionTwoTrigger && currentY < endOfSectionTwo) {
        console.log('section 2');
        const scale = chroma.scale(['rgb(39,41,50)', 'rgb(245, 143, 41)']).domain([sectionTwoTrigger, (sectionHeight * 2)]);

        document.body.style.backgroundColor = scale(currentY);
    }

    if (currentY >= sectionThreeTrigger) {
        console.log('section 3');
        const scale = chroma.scale(['rgb(245, 143, 41)', 'rgb(130, 132, 137)']).domain([sectionThreeTrigger, (sectionHeight * 3)]);
        document.body.style.backgroundColor = scale(currentY);
    }
};