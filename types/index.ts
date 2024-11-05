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


export interface TeamProfileProps {
  name: string;
  id: number,
  head: TeamMemberProps;
  faculty: TeamMemberProps[];
  student: TeamMemberProps[];
}

export interface TeamDataProps {
  teamData: TeamProfileProps;
}

export interface TeamMemberProps {
  id: number;
  teamId: number;
  name: string;
  role: string;
  memberType: string;
  image: File | any;
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

export interface Initiative {
  id: string,
  images: string[];
  caption: string;
  description: string;
  location: string;
  date: string;
}

export interface InitiativeFocusArea {
  id: string;
  name: string;
  initiatives: Initiative[];
}

export interface ButtonProps{
  title: string;
  styles: string;
}

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  teaser: string;
  poster: string | any;
  objectives: string[];
  registrationLink: string;
  isPast: boolean;
}

export interface TeamProps {
  id: number | any
  name: string
  head: TeamMemberProps 
  faculty: TeamMemberProps[]
  student: TeamMemberProps[]
}