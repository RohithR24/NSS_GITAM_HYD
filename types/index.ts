export interface CardProps {
  image: string;
  title: string;
  content: string;
}

export interface ButtonProps {
  title: string;
  color: string;
}

export interface StatCardProps {
  icon: string | any;
  endNumber: number;
  label: string;
}

export interface TeamMemberProps {
  id: number;
  name: string;
  role: string;
  image: any;
  social: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface TeamProfileProps {
  year: string;
  head: TeamMemberProps;
  faculty: TeamMemberProps[];
  students: TeamMemberProps[];
}

export interface TeamDataProps {
  teamData: TeamProfileProps;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string | any;
  social: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface Team {
  id: number;
  name: string;
  year: number;
  description: string;
}

export interface TabTitleProps{
  id: string,
  name: string
}
export interface TabsProps {
  title: TabTitleProps[];
  activeTab: string;
  onTabSelect: (area: string) => void;
}

export interface InitiativeCardProps {
  image: string;
  caption: string;
}
export interface InitiativeProps {
  id: string;
  name: string;
  initiatives: InitiativeCardProps[];
}
