class ProjectName {
    transform = ({ project }) => project.toLowerCase().replace(/ /g, '-');
}

module.exports = { ProjectName };
