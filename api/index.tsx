import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import {TeamProps} from '@/types/index'

// Fetches the Teams with members
/* Read from firebase */
export const fetchTeamWithMembers = async (teamId: string) => {
  try {
    // Fetch the main team document
    const teamDocRef = doc(db, "teams", teamId);
    const teamDoc = await getDoc(teamDocRef);

    if (!teamDoc.exists()) {
      console.log("No such team exists");
      return null;
    }
    const teamData = teamDoc.data();

    // Query the profile collection to get all members for this team
    const profilesQuery = query(
      collection(db, "profile"), // Assuming 'profile' is the name of your collection
      where("teamId", "==", "20182019")
    );
    const profilesSnapshot = await getDocs(profilesQuery);

    profilesSnapshot.forEach((doc) => {
      const profileData = doc.data();
    });

    // Organize members based on their role
    let head = null;
    const faculty: DocumentData[] = [];
    const students: DocumentData[] = [];

    // Iterate over the documents in the QuerySnapshot
    profilesSnapshot.forEach((doc) => {
      const profileData = doc.data();

      // Check the role field to categorize data
      switch (profileData.memberType) {
        case "head":
          head = profileData; // Assuming only one head
          break;
        case "faculty":
          faculty.push(profileData);
          break;
        case "student":
          students.push(profileData);
          break;
        default:
          console.warn(`Unknown role: ${profileData.role}`);
      }
    });

    // Combine all data into a single object
    const completeTeamData = {
      ...teamData,
      head,
      faculty,
      students,
    };
  } catch (error) {
    console.error("Error fetching team data:", error);
    return null;
  }
};

/*Fetch the data from team */

export const fetchAllTeams = async () => {
  try {
    // Reference to the 'teams' collection
    const teamsCollectionRef = collection(db, 'teams');

    // Get all documents from the 'teams' collection
    const teamsSnapshot = await getDocs(teamsCollectionRef);

    // Map each document to match the Team interface
    const teams: TeamProps[] = teamsSnapshot.docs.map(doc => ({
      id: doc.data().id ?? 0, // Get the 'id' from the Firestore document, or default to 0
      name: doc.data().name ?? '', // Get the 'name' from the Firestore document, or default to an empty string
      head: {
        id: 0,
        name: '',
        role: '',
        image: '',
        social: {}
      }, // Provide a default empty TeamMember object for 'head'
      faculty: [], // Initialize 'faculty' as an empty array
      students: [] // Initialize 'students' as an empty array
    }));

    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
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
