const portfolioProjects = {};

function registerProject(id, data) {
    portfolioProjects[id] = data;
}

function getProject(id) {
    return portfolioProjects[id];
}

function getAllProjects() {
    return portfolioProjects;
}
