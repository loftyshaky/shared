class ProjectName {
    public transform = ({ project }: { project: string }) =>
        project.toLowerCase().replace(/ /g, '-');
}

export { ProjectName };
