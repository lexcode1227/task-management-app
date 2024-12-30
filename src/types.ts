export interface Cards {
  id: number;
  name: string;
  icon?: React.ReactNode;
  pointEstimate: string;
  // tags: Tags[];
  tags: string[];
  assignee: {
    avatar: string;
  }
}

export interface Tags {
    titleTag: string;
    icon?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    className?: string;
}