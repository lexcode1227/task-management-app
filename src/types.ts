export interface Cards { 
    id: number; 
    title: string; 
    icon?: React.ReactNode; 
    points: string; 
    tags: Tags[]; 
    avatarUrl: string 
}

export interface Tags {
    titleTag: string;
    icon?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    className?: string;
}