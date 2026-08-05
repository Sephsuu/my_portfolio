export type ProjectSummary = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    images: string[];
    role: string;
    projectType: string
    detailPath?: string;
    isMockData: boolean
};

export type ProjectModule = {
    id: string;
    title: string;
    description: string;
    features: string[];
    images: string[];
};

export type ProjectContributor = {
    id: string;
    tabLabel: string;
    name: string;
    role: string;
    image: string;
    imageAlt: string;
    focusAreas: [string, string];
    contributions: string[];
};

export type ProjectDetail = ProjectSummary & {
    subtitle: string;
    overview: {
        challenge: string;
        solution: string;
    };
    contributors: ProjectContributor[];
    highlights: string[];
    modules: ProjectModule[];
};
