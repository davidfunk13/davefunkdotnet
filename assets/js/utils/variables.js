// when attributes are assigned to section objects they will end up here
const sectionCollection = [];

//array of colors for each section, will possibly randomize these and add extras.
const colors = ['rgb(32, 65, 142)', 'rgb(39, 41, 50)', 'rgb(32, 40, 64)', 'rgb(130, 132, 137)'];

// height of entire document in pixels
// const height = document.body.scrollHeight;
const height = (document.height !== undefined) ? document.height : document.body.offsetHeight;
// console.log({ height })

// rgb(82, 91, 118)