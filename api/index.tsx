import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { TeamMemberProps, TeamProps } from "@/types/index";

// Fetches the Teams with members
/* Read from firebase */
const defaultTeamMember: TeamMemberProps = {
  id: Date.now(),
  teamId: 0,
  name: "",
  memberType: "",
  role: "",
  image: "",
  social: {},
};
export const fetchProfilesByTeamId = async (teamId: string) => {
  try {
    // Fetch all documents from the profile collection
    const profilesSnapshot = await getDocs(collection(db, "profile"));

    // Initialize containers for categorized members
    let head: TeamMemberProps | null = null;
    const faculty: TeamMemberProps[] = [];
    const students: TeamMemberProps[] = [];

    // Filter the profiles based on the teamId and categorize them
    profilesSnapshot.forEach((doc) => {
      const profileData = doc.data();

      if (profileData.teamId?.toString() === teamId) {
        const member: TeamMemberProps = {
          id: profileData.id ?? Date.now(),
          teamId: profileData.teamId ?? 0,
          name: profileData.name ?? "",
          role: profileData.role ?? "",
          memberType: profileData.memberType ?? "",
          image: profileData.image ?? "",
          social: profileData.social ?? {},
        };

        switch (member.memberType) {
          case "head":
            head = member;
            break;
          case "faculty":
            faculty.push(member);
            break;
          case "student":
            students.push(member);
            break;
          default:
            console.warn(`Unknown memberType: ${member.memberType}`);
        }
      }
    });
    // Combine all filtered data into a single object
    const filteredTeamData = {
      head,
      faculty,
      students,
    };

    return filteredTeamData;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return null;
  }
};

/*Fetch the data from team */

export const fetchAllTeams = async () => {
  try {
    // Reference to the 'teams' collection
    const teamsCollectionRef = collection(db, "teams");

    // Get all documents from the 'teams' collection
    const teamsSnapshot = await getDocs(teamsCollectionRef);

    // Map each document to match the Team interface
    var teams: TeamProps[] = teamsSnapshot.docs.map((doc) => ({
      id: doc.data().id ?? 0, // Get the 'id' from the Firestore document, or default to 0
      name: doc.data().name ?? "", // Get the 'name' from the Firestore document, or default to an empty string
      head: {
        id: Date.now(),
        teamId: 0,
        name: "",
        memberType: "",
        role: "",
        image: "",
        social: {},
      }, // Provide a default empty TeamMember object for 'head'
      faculty: [], // Initialize 'faculty' as an empty array
      students: [], // Initialize 'students' as an empty array
    }));

    for (let i = 0; i < teams.length; i++) {
      const teamData = await fetchProfilesByTeamId(teams[i].id.toString());

      // console.log( 'Team Data', teamData)
      if (teamData) {
        // Ensure that 'head' is not null and assign a default value if it is

        const head = teamData.head ?? {
          ...defaultTeamMember,
          teamId: teams[i].id,
        };

        // Update the current team with the merged data
        teams[i] = { ...teams[i], ...teamData, head };
      }
    }

    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return []; // Return an empty array in case of an error
  }
};

/*Write: firebase */
export const createTeamWithCustomID = async (teamId: string, teamData: any) => {
  try {
    // Reference to the document in the 'teams' collection with a custom ID
    const teamDocRef = doc(db, "teams", teamId);

    // Set the document with the provided data
    await setDoc(teamDocRef, teamData);
    console.log("Document created with custom ID:", teamId);

    return teamId;
  } catch (error) {
    console.error("Error creating team:", error);
    return null;
  }
};

//Save the member

// Save the member to Firestore
export const saveMember = async (id: number, profileData: TeamMemberProps) => {
  try {
    console.log();
    // Reference to the document in the "profile" collection
    const profileRef = doc(db, "profile", id.toString());

    // Check if the document already exists
    const existingDoc = await getDoc(profileRef);

    if (existingDoc.exists()) {
      // If the document exists, update it
      await setDoc(profileRef, profileData, { merge: true });
      console.log("Member updated successfully");
    } else {
      // If the document does not exist, create a new one
      // If memberId is provided, update the existing document
      const profileRef = doc(db, "profile", id.toString());
      await setDoc(profileRef, profileData, { merge: true });
      console.log("New member created successfully");
    }
  } catch (error) {
    console.error("Error saving member:", error);
  }
};
