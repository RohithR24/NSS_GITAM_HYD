"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash, ChevronDown, ChevronUp, X } from "lucide-react";
import { createTeamWithCustomID, fetchAllTeams, saveMember } from "@/api/index";
import { TeamProps, TeamMemberProps } from "@/types/index";


const defaultMember: TeamMemberProps = {
  id: Date.now(),
  teamId : 0,
  name: "",
  role: "",
  memberType: "",
  image: "/placeholder.svg",
  social: {},
};

const AdminDashboard: React.FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMemberProps | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await fetchAllTeams();
        console.log('Test', fetchedTeams);
        setTeams(fetchedTeams); // Update state with fetched teams
      } catch (error) {
        console.error("Error in fetching teams:", error);
        setTeams([]); // Set an empty array in case of an error
      }
    };

    fetchTeams(); // Fetch teams when the component mounts
  }, []);
  const handleCreateTeam = () => {
    setIsCreatingTeam(true);
    setNewTeamName(
      `Team ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
    );
  };

  //API Integrated
  const handleSubmitNewTeam = () => {
    createTeamWithCustomID(newTeamName, { name: newTeamName, id: Date.now() });
    const newTeam: TeamProps = {
      id: Date.now(),
      name: newTeamName,
      head: { ...defaultMember, id: Date.now(), role: "NSS Co-Ordinator" },
      faculty: [],
      students: [],
    };
    setTeams([...teams, newTeam]);
    setExpandedTeam(newTeam.id);
    setIsCreatingTeam(false);
    setNewTeamName("");
  };

  const handleAddMember = (
    teamId: number,
    category: "faculty" | "students"
  ) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const newMember: TeamMemberProps = {
          ...defaultMember,
          id: Date.now(),
          role: category === "faculty" ? "Faculty Member" : "Student Member",
          memberType: category === "faculty"? "faculty": "student"
        };
        return { ...team, [category]: [...team[category], newMember] };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleEditMember = (member: TeamMemberProps) => {
    setEditingMember(member);
  };

  const handleDeleteMember = (
    teamId: number,
    category: "head" | "faculty" | "students",
    memberId: number
  ) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        if (category === "head") {
          return {
            ...team,
            head: {
              ...defaultMember,
              id: Date.now(),
              role: "NSS Co-Ordinator",
            },
          };
        } else {
          return {
            ...team,
            [category]: team[category].filter((m) => m.id !== memberId),
          };
        }
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleSaveMember = (updatedMember: TeamMemberProps) => {
    const updatedTeams = teams.map((team) => {
      console.log('updatedMember ', updatedMember)
      if (expandedTeam === team.id) {
        // Set the teamId for the updated member
        updatedMember.teamId = team.id;
        // Generate a unique id for the new member if it doesn't have one  
        // Save the updated member to Firestore
        saveMember(updatedMember.id, updatedMember);
  
        // Update the head, faculty, or students array
        let updatedHead = team.head;
        let updatedFaculty = team.faculty.map((m) =>
          m.id === updatedMember.id ? updatedMember : m
        );
        let updatedStudents = team.students.map((m) =>
          m.id === updatedMember.id ? updatedMember : m
        );
  
        // Check if the updated member is the head
        if (team.head && team.head.id === updatedMember.id) {
          updatedHead = updatedMember;
        }
  
        // If the updated member is not found in faculty or students, add it to the appropriate array
        if (!updatedFaculty.some((m) => m.id === updatedMember.id) && updatedMember.role === 'faculty') {
          updatedFaculty = [...updatedFaculty, updatedMember];
        }
  
        if (!updatedStudents.some((m) => m.id === updatedMember.id) && updatedMember.role === 'student') {
          updatedStudents = [...updatedStudents, updatedMember];
        }
  
        // Return the updated team object with the modified head, faculty, and students
        return {
          ...team,
          head: updatedHead,
          faculty: updatedFaculty,
          students: updatedStudents,
        };
      }
  
      // If this is not the expanded team, return it unchanged
      return team;
    });
  
    // Update the state with the modified teams array
    setTeams(updatedTeams);
    // Clear the editing member state
    setEditingMember(null);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          NSS Admin Dashboard
        </h1>
        {!isCreatingTeam ? (
          <button
            onClick={handleCreateTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
          >
            <Plus size={20} className="mr-2" /> Create New Team
          </button>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Create New Team</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="flex-grow p-2 border rounded-md mr-2"
                placeholder="Enter team name"
              />
              <button
                onClick={handleSubmitNewTeam}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
              <button
                onClick={() => setIsCreatingTeam(false)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
          >
            <div
              className="bg-blue-100 p-4 flex justify-between items-center cursor-pointer"
              onClick={() =>
                setExpandedTeam(expandedTeam === team.id ? null : team.id)
              }
            >
              <h2 className="text-xl font-semibold text-blue-900">
                {team.name}
              </h2>
              {expandedTeam === team.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandedTeam === team.id && (
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Head Coordinator</h3>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-4">
                  <div className="flex items-center">
                    <img
                      src={team.head.image}
                      alt={team.head.name}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-medium">{team.head.name}</p>
                      <p className="text-sm text-gray-500">{team.head.role}</p>
                      <p className="font-medium">{team.head.memberType}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEditMember(team.head)}
                      className="text-blue-500 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteMember(team.id, "head", team.head.id)
                      }
                      className="text-red-500"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Faculty Members</h3>
                {team.faculty.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                        <p className="font-medium">{member.memberType}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditMember(member)}
                        className="text-blue-500 mr-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteMember(team.id, "faculty", member.id)
                        }
                        className="text-red-500"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleAddMember(team.id, "faculty")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mt-2 mb-4"
                >
                  Add Faculty Member
                </button>
                <h3 className="text-lg font-semibold mb-2">Student Members</h3>
                {team.students.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md mb-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                        <p className="font-medium">{member.memberType}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditMember(member)}
                        className="text-blue-500 mr-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteMember(team.id, "students", member.id)
                        }
                        className="text-red-500"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleAddMember(team.id, "students")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mt-2"
                >
                  Add Student Member
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
            <input
              type="text"
              value={editingMember.name}
              onChange={(e) =>
                setEditingMember({ ...editingMember, name: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Name"
            />
            <input
              type="text"
              value={editingMember.role}
              onChange={(e) =>
                setEditingMember({ ...editingMember, role: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Role"
            />

            <input
              type="text"
              value={editingMember.memberType}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  memberType: e.target.value,
                })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Member Type"
            />
            <input
              type="text"
              value={editingMember.image}
              onChange={(e) =>
                setEditingMember({ ...editingMember, image: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Image URL"
            />
            <input
              type="text"
              value={editingMember.social.linkedin || ""}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  social: { ...editingMember.social, linkedin: e.target.value },
                })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="LinkedIn URL"
            />
            <input
              type="text"
              value={editingMember.social.instagram || ""}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  social: {
                    ...editingMember.social,
                    instagram: e.target.value,
                  },
                })
              }
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Instagram URL"
            />
            <input
              type="text"
              value={editingMember.social.facebook || ""}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  social: { ...editingMember.social, facebook: e.target.value },
                })
              }
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Facebook URL"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditingMember(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveMember(editingMember)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
