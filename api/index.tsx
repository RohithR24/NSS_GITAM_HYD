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
  deleteDoc,
} from "firebase/firestore";
import { TeamMemberProps, TeamProps } from "@/types/index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

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
        image: File,
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

// Save the member to Firestore
export const saveMember = async (id: number, profileData: TeamMemberProps) => {
  try {
    // Reference to the document in the "profile" collection
    const profileRef = doc(db, "profile", id.toString());

    // Retrieve the existing document (if it exists) to get the current image URL
    const existingDoc = await getDoc(profileRef);
    let existingImageUrl = "";

    if (existingDoc.exists()) {
      const existingData = existingDoc.data();
      existingImageUrl = existingData.image || ""; // Use the existing image if no new image is uploaded
    }

    // Handle the case where a new image file is provided, otherwise keep the existing image
    if (profileData.image && profileData.image instanceof File) {
      // If a new image is provided, upload it to Firebase
      profileData.image = await uploadImageToFirebase(
        profileData.image,
        profileData.teamId,
        profileData.id
      );
    } else {
      // No new image, so keep the existing image
      profileData.image = existingImageUrl;
    }

    console.log("profileData", profileData);

    // Save or update the profile data in Firestore
    await setDoc(profileRef, profileData, { merge: true });
    console.log("Member updated successfully");
    
  } catch (error) {
    console.error("Error saving member:", error);
  }
};


export const uploadImageToFirebase = async (
  file: File,
  teamId: number,
  memberId: number
): Promise<string> => {
  try {
    // Get a reference to Firebase Storage
    console.log("file", file);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a Promise that resolves with the download URL
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error); // Reject the Promise in case of an error
        },
        async () => {
          // Once the upload is complete, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Image URL successfully uploaded:", downloadURL);
          resolve(downloadURL); // Resolve the Promise with the download URL
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Function to delete a profile by ID
export const deleteProfileById = async (id: number) => {
  try {
    // Reference to the document in the "profile" collection
    const profileRef = doc(db, "profile", id.toString());

    //Delete the document
    await deleteDoc(profileRef);

    console.log(`Profile with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting profile", error);
  }
};
