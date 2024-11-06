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
import { Award, EventCardProps, Initiative, InitiativeFocusArea, TeamMemberProps, TeamProps } from "@/types/index";
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
    const profilesSnapshot = await getDocs(collection(db, "profiles"));

    // Initialize containers for categorized members
    let head: TeamMemberProps | null = null;
    const faculty: TeamMemberProps[] = [];
    const student: TeamMemberProps[] = [];

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

        switch (member.memberType.toLowerCase()) {
          case "head":
            head = member;
            break;
          case "faculty":
            faculty.push(member);
            break;
          case "student":
            student.push(member);
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
      student,
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
      student: [], // Initialize 'students' as an empty array
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

    return teams.sort((a, b) => {
      return b.name.localeCompare(a.name)});
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
    const profileRef = doc(db, "profiles", id.toString());

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
        profileData.image
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
  file: File
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
    const profileRef = doc(db, "profiles", id.toString());

    //Delete the document
    await deleteDoc(profileRef);

    console.log(`Profile with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting profile", error);
  }
};



/*Focus Area */
// Read // 

export const fetchFocusAreas = async (): Promise<InitiativeFocusArea[]> => {
  try {
    const focusAreasCollection = collection(db, "focusAreas");
    const focusAreasSnapshot = await getDocs(focusAreasCollection);

    const focusAreas: InitiativeFocusArea[] = await Promise.all(
      focusAreasSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const initiativesCollection = collection(db, `focusAreas/${doc.id}/initiatives`);
        const initiativesSnapshot = await getDocs(initiativesCollection);

        const initiatives: Initiative[] = initiativesSnapshot.docs.map((initiativeDoc) => {
          const initiativeData = initiativeDoc.data();

          // Ensure each initiative matches the Initiative interface
          return {
            id: initiativeData.id,
            images: initiativeData.images || ["image"],
            caption: initiativeData.caption || "Untitled Initiative",
            description: initiativeData.description || "No description provided.",
            location: initiativeData.location || "Unknown location",
            date: initiativeData.date || new Date().toISOString().slice(0, 10),
          };
        });

        return {
          id: doc.id,
          name: data.name || "Unnamed Focus Area",
          initiatives,
        };
      })
    );

    return focusAreas;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    throw error;
  }
};

/*Write */
/**
 * Adds a new initiative to a specific focus area in Firestore.
 * @param {string} focusAreaId - The ID of the focus area to add the initiative to.
 * @param {Object} initiative - The initiative data to add.
 * @returns {Promise<void>}
 */

export const addInitiativeFB = async (focusAreaId: string, initiative: Initiative, initiativeId: string) => {
  try {
    // Reference to the initiatives collection within the specific focus area
    const initiativeDocRef = doc(db, `focusAreas/${focusAreaId}/initiatives`, initiativeId);
    await setDoc(initiativeDocRef, initiative);
  } catch (error) {
    console.error("Error adding initiative to Firestore:", error);
    throw new Error("Failed to add initiative. Please try again.");
  }
};


/**
 * Updates an initiative in the Firestore subcollection with a specific ID.
 * @param {string} focusAreaId - The ID of the focus area.
 * @param {string} initiativeId - The unique ID of the initiative to update.
 * @param {Initiative} initiative - The updated initiative data.
 * @returns {Promise<void>}
 */
export const updateInitiativeFB = async (focusAreaId: string, initiative: Initiative, initiativeId: string) => {
  try {
    const initiativeDocRef = doc(db, `focusAreas/${focusAreaId}/initiatives`, initiativeId);
    await setDoc(initiativeDocRef, initiative); // Overwrites the document with the provided data
    console.log("Document successfully updated:", initiative);
  } catch (error) {
    console.error("Error updating document in Firestore:", error);
    throw new Error("Failed to update initiative. Please check your Firebase configuration.");
  }
};

/**
 * Deletes an initiative from the Firestore subcollection with a specific ID.
 * @param {string} focusAreaId - The ID of the focus area.
 * @param {string} initiativeId - The unique ID of the initiative to delete.
 * @returns {Promise<void>}
 */
export const deleteInitiativeFB = async (focusAreaId: string, initiativeId: string) => {
  try {
    const initiativeDocRef = doc(db, `focusAreas/${focusAreaId}/initiatives`, initiativeId);
    await deleteDoc(initiativeDocRef);
    console.log("Document successfully deleted:", initiativeId);
  } catch (error) {
    console.error("Error deleting document from Firestore:", error);
    throw new Error("Failed to delete initiative. Please check your Firebase configuration.");
  }
};

export const uploadImage = async (file: File, Id: string) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `initiatives/${Id}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};


export const saveAwardToFirebase = async (award: {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
}): Promise<void> => {
  try {
    const docRef = doc(db, 'awards', award.id); // Save award in 'awards' collection with `id` as document name
    await setDoc(docRef, award);
    console.log("Award data successfully saved to Firestore:", award);
  } catch (error) {
    console.error("Error saving award to Firestore:", error);
    throw error;
  }
};


export const deleteAwardFromFirebase = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'awards', id);
    await deleteDoc(docRef);
    console.log("Award successfully deleted from Firestore:", id);
  } catch (error) {
    console.error("Error deleting award from Firestore:", error);
    throw error;
  }
};


export const fetchAwardsFromFirebase = async (): Promise<Award[]> => {
  try {
    const awardsCollection = collection(db, 'awards');
    const awardDocs = await getDocs(awardsCollection);
    const awards = awardDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Award[];
    console.log("Awards fetched from Firestore:", awards);
    return awards;
  } catch (error) {
    console.error("Error fetching awards from Firestore:", error);
    throw error;
  }
};





/**
 * Create a new event in Firestore
 * @param eventData - Event data to be saved
 * @returns ID of the created event
 */
export const createEventFB = async (
  eventData: EventCardProps
): Promise<string> => {
  console.log('Attempting to create event:', );
  try {
    const eventRef = doc(db, 'events', eventData.id); // Save award in 'awards' collection with `id` as document name
    await setDoc(eventRef, eventRef);
    console.log('Event created with ID:', eventData.id);
    return eventData.id;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * Read all events from Firestore
 * @returns Array of events
 */
export const fetchEventsFB = async (): Promise<EventCardProps[]> => {
  console.log('Fetching events from Firestore');
  try {
    const eventsCollectionRef = collection(db, 'events');
    const data = await getDocs(eventsCollectionRef);
    const events = data.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as EventCardProps)
    );
    console.log('Events fetched:', events);
    return events;
  } catch (error) {
    console.error('Error reading events:', error);
    throw error;
  }
};

/**
 * Update an event in Firestore
 * @param id - ID of the event to update
 * @param updatedData - Updated event data
 */
export const updateEvent = async (
  id: string,
  updatedData: EventCardProps
): Promise<void> => {
  console.log(`Updating event with ID ${id}:`, updatedData);
  try {
    const eventDoc = doc(db, 'events', id);
    await setDoc(eventDoc, updatedData);
    console.log('Event updated successfully');
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

/**
 * Delete an event from Firestore
 * @param id - ID of the event to delete
 */
export const deleteEventById = async (id: string): Promise<void> => {
  console.log('Deleting event with ID:', id);
  try {
    const eventDoc = doc(db, 'events', id);
    await deleteDoc(eventDoc);
    console.log('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
