import { facebook, instagram, twitter } from "@/public/icons/index";
import { Avatar, Coordinator } from "@/public/team";
import { EventCardProps, InitiativeFocusArea } from "@/types";
import { BloodDonation, CommunityCleanupDrive } from "@/public/images/index";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about-us", label: "About Us" },
  { href: "#collaborations", label: "Collaborations" },
  { href: "#Team", label: "Team" },
  { href: "#contact-us", label: "Contact Us" },
];

export const InitiativesData = [
  {
    image: "HarithaHaram",
    title: "Haritha Haram",
    content:
      "Haritha Haram is Telangana's afforestation program, launched in 2015 to increase green cover from 24% to 33%. Around 266 crore saplings have been planted, with survival rates of 50-90% depending on the location. The initiative has expanded forest cover and involves community participation. However, concerns have been raised about the effectiveness of monoculture plantations.",
  },
  {
    image: "BookDistribution",
    title: "Book Distribution",
    content:
      "Book distribution as a social service involves providing free or affordable books to underserved communities, schools, or individuals to promote education and literacy. This initiative helps bridge educational gaps, supports lifelong learning, and empowers people with knowledge. Often carried out by NGOs, charities, or volunteers, these programs focus on reaching remote areas, marginalized groups, or low-income families, ensuring access to quality reading material that might otherwise be out of reach. The goal is to foster a culture of reading and provide resources for personal and educational development.",
  },
  {
    image: "HarithaHaram",
    title: "Haritha Haram",
    content:
      "Haritha Haram is Telangana's afforestation program, launched in 2015 to increase green cover from 24% to 33%. Around 266 crore saplings have been planted, with survival rates of 50-90% depending on the location. The initiative has expanded forest cover and involves community participation. However, concerns have been raised about the effectiveness of monoculture plantations.",
  },
  {
    image: "BookDistribution",
    title: "Book Distribution",
    content:
      "Book distribution as a social service involves providing free or affordable books to underserved communities, schools, or individuals to promote education and literacy. This initiative helps bridge educational gaps, supports lifelong learning, and empowers people with knowledge. Often carried out by NGOs, charities, or volunteers, these programs focus on reaching remote areas, marginalized groups, or low-income families, ensuring access to quality reading material that might otherwise be out of reach. The goal is to foster a culture of reading and provide resources for personal and educational development.",
  },
];

export const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Awards", link: "/" },
      { name: "Blog", link: "/" },
      { name: "Notice Board", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "Privacy policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "nss.admin@gitam.edu", link: "nss.admin@gitam.edu" },
      { name: "+92554862354", link: "tel:+92554862354" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];

export const teamStructure = [
  {
    year: "Team 2019-2020",
    head: {
      id: 1,
      name: "Dr. P.V Nagendra Kumar ",
      role: "NSS Co-Ordinator",
      image: Coordinator,
      social: {
        linkedin: "https://linkedin.com/in/johndoe",
        instagram: "https://instagram.com/johndoe",
        facebook: "https://facebook.com/johndoe",
      },
    },
    faculty: [
      {
        id: 2,
        name: "Faculty 1",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/alicejohnson",
          instagram: "https://instagram.com/alicejohnson",
        },
      },
      {
        id: 3,
        name: "Faculty 2",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/bobsmith",
          facebook: "https://facebook.com/bobsmith",
        },
      },
      {
        id: 4,
        name: "Faculty 3",
        role: "Team Member",
        image: Avatar,
        social: {
          instagram: "https://instagram.com/carolwilliams",
          facebook: "https://facebook.com/carolwilliams",
        },
      },
      {
        id: 5,
        name: "Faculty 4",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/davidbrown",
          instagram: "https://instagram.com/davidbrown",
        },
      },
    ],

    students: [
      {
        id: 2,
        name: "Student 1",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/alicejohnson",
          instagram: "https://instagram.com/alicejohnson",
        },
      },
      {
        id: 3,
        name: "Student 2",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/bobsmith",
          facebook: "https://facebook.com/bobsmith",
        },
      },
      {
        id: 4,
        name: "Student 3",
        role: "Team Member",
        image: Avatar,
        social: {
          instagram: "https://instagram.com/carolwilliams",
          facebook: "https://facebook.com/carolwilliams",
        },
      },
      {
        id: 5,
        name: "Student 4",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/davidbrown",
          instagram: "https://instagram.com/davidbrown",
        },
      },
    ],
  },
  {
    year: "Team 2018-2019",
    head: {
      id: 1,
      name: "Dr. P.V Nagendra Kumar ",
      role: "Program Co-Ordinator",
      image: Coordinator,
      social: {
        linkedin: "https://linkedin.com/in/johndoe",
        instagram: "https://instagram.com/johndoe",
        facebook: "https://facebook.com/johndoe",
      },
    },
    faculty: [
      {
        id: 2,
        name: "Faculty 1",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/alicejohnson",
          instagram: "https://instagram.com/alicejohnson",
        },
      },
      {
        id: 3,
        name: "Faculty 2",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/bobsmith",
          facebook: "https://facebook.com/bobsmith",
        },
      },
      {
        id: 4,
        name: "Faculty 3",
        role: "Team Member",
        image: Avatar,
        social: {
          instagram: "https://instagram.com/carolwilliams",
          facebook: "https://facebook.com/carolwilliams",
        },
      },
      {
        id: 5,
        name: "Faculty 4",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/davidbrown",
          instagram: "https://instagram.com/davidbrown",
        },
      },
    ],

    students: [
      {
        id: 2,
        name: "Charan",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/alicejohnson",
          instagram: "https://instagram.com/alicejohnson",
        },
      },
      {
        id: 3,
        name: "Rohith",
        role: "Team Member",
        image: Avatar,
        social: {
          linkedin: "https://linkedin.com/in/bobsmith",
          facebook: "https://facebook.com/bobsmith",
        },
      },
      {
        id: 4,
        name: "Vidwan",
        role: "Team Member",
        image: Avatar,
        social: {
          instagram: "https://instagram.com/carolwilliams",
          facebook: "https://facebook.com/carolwilliams",
        },
      },
      {
        id: 5,
        name: "Prathyusha",
        role: "Team Member",
        image: Avatar,
        social: {
          instagram: "https://instagram.com/carolwilliams",
          facebook: "https://facebook.com/carolwilliams",
        },
      }

    ],
  },
];

// FocusArea interface declaration for clarity
export const initiativeFocusAreas: InitiativeFocusArea[] = [
  {
    id: "education",
    name: "Education",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Literacy campaign in rural areas",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Computer education for underprivileged children",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Adult education programs",
      },
    ],
  },
  {
    id: "environment",
    name: "Environment",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Tree plantation drive",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Plastic-free campus campaign",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Water conservation project",
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Blood donation camp",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "COVID-19 awareness program",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Yoga and meditation workshop",
      },
    ],
  },
  {
    id: "community",
    name: "Community Service",
    initiatives: [
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Village adoption program",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Cleanliness drive in local community",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        caption: "Elderly care initiative",
      },
    ],
  },
];

export const teamTabTitles = [
  { id: "faculty", name: "Faculty Team" },
  { id: "student", name: "Student Team" },
];

export const programs = [
  { id: "upcoming", name: "Upcoming Events" },
  { id: "past", name: "Past Events" },
];


export const events: EventCardProps[] = [
  {
    id: "1",
    title: "Community Cleanup Drive",
    date: "2024-12-21",
    time: "09:00 AM",
    location: "City Park",
    description:
      "Join us for a day of environmental stewardship as we clean up our beloved City Park. This event aims to remove litter, plant trees, and create awareness about the importance of maintaining our green spaces. Bring your friends and family for a day of community service and fun! We'll provide all necessary cleaning supplies and refreshments for volunteers. Let's work together to make our community cleaner and greener!",
    teaser: "Help us make our city cleaner and greener!",
    poster: CommunityCleanupDrive,
    objectives: [
      "Remove litter from park grounds",
      "Plant 50 new trees",
      "Educate participants about recycling",
    ],
    registrationLink: "https://example.com/register",
    isPast: false,
  },
  {
    id: "2",
    title: "Blood Donation Camp",
    date: "2024-12-23",
    time: "10:00 AM",
    location: "University Auditorium",
    description:
      "Be a hero, donate blood! Our annual blood donation camp is back, and we need your support. Your single donation can save up to three lives. Medical professionals will be on-site to ensure a safe and comfortable donation process. Refreshments will be provided to all donors. Join us in this noble cause and make a difference in someone's life. Remember, the life you save could be your own or that of a loved one.",
    teaser: "Save lives with a simple act of kindness.",
    poster: BloodDonation,
    objectives: [
      "Collect 100 units of blood",
      "Raise awareness about blood donation",
      "Recruit new regular donors",
    ],
    registrationLink: "https://example.com/register",
    isPast: false,
  },
  {
    id: "3",
    title: "Tree Plantation Drive",
    date: "2024-12-05",
    time: "08:00 AM",
    location: "City Outskirts",
    description:
      "On World Environment Day, we organized a massive tree plantation drive on the outskirts of our city. Over 500 volunteers participated, planting more than 1000 saplings. The event also included workshops on sustainable living and the importance of urban green spaces. It was a day filled with enthusiasm, learning, and a shared commitment to a greener future. The saplings planted will grow into a small forest, providing a green lung for our city and a habitat for local wildlife.",
    teaser: "We planted hope for a greener future!",
    poster: "/placeholder.svg?height=400&width=600&text=Tree+Plantation",
    objectives: [
      "Plant 1000+ trees",
      "Raise environmental awareness",
      "Promote community engagement",
    ],
    registrationLink: "",
    isPast: true,
  },
];
