export interface CardProps{
    image: string;
    title: string;
    content: string;
    
}

export interface ButtonProps{
    title: string;
    color: string;
}


export interface StatCardProps {
  icon: string | any;
  endNumber: number;
  label: string;
}

export interface TeamMemberProps {
  id: number,           
  name: string,
  role: string,
  image: any,
  social: {
    linkedin?: string,
    instagram?: string,
    facebook?: string,
  }
}

export interface TeamProfileProps {
  year: string,
  head: TeamMemberProps,
  faculty: TeamMemberProps[],  
  students: TeamMemberProps[]  
}

export interface TeamDataProps{
  teamData: TeamProfileProps
}
