"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  createTeamWithCustomID,
  fetchAllTeams,
  saveMember,
  deleteProfileById,
} from "@/api/index";
import { TeamProps, TeamMemberProps } from "@/types/index";
import FormModal from "@/app/components/ui/FormModal";
import { CollapsibleList, TeamCard } from "@/app/components/ui";

const defaultMember: TeamMemberProps = {
  id: Date.now(),
  teamId: 0,
  name: "",
  role: "",
  memberType: "student",
  image: null,
  social: {},
};

const TeamDashboard: React.FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMemberProps | null>(
    null
  );
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  // Fetching teams from the backend on load
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await fetchAllTeams();
        console.log("fetchedTeams", fetchedTeams);
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams([]); // Set an empty array in case of an error
      }
    };

    fetchTeams(); // Fetch teams when the component mounts
  }, []);

  // Handle team creation
  const handleCreateTeam = () => {
    setIsCreatingTeam(true);
    setNewTeamName(
      `Team ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
    );
  };

  // Save new team
  const handleSubmitNewTeam = () => {
    const newTeamId = Date.now();
    const newTeam: TeamProps = {
      id: newTeamId,
      name: newTeamName,
      head: {
        ...defaultMember,
        id: Date.now(),
        teamId: newTeamId,
        role: "NSS Co-Ordinator",
        memberType: "head",
        name: "NSS-Co-Ordinator",
      },
      faculty: [],
      students: [],
    };
    createTeamWithCustomID(newTeamName, { name: newTeamName, id: newTeamId });
    saveMember(newTeam.head.id, newTeam.head);
    console.log("head", newTeam);
    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setIsCreatingTeam(false);
    setNewTeamName("");
  };

  // Handle Add/Edit member logic
  const handleSaveMember = (
    updatedMember: TeamMemberProps,
    isEditing: boolean
  ) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === updatedMember.teamId) {
        saveMember(updatedMember.id, updatedMember);
        console.log("Adding Profile", updatedMember.memberType);
        if (isEditing) {
          // Edit existing member
          const updatedFaculty = team.faculty.map((member) =>
            member.id === updatedMember.id ? updatedMember : member
          );
          const updatedStudents = team.students.map((member) =>
            member.id === updatedMember.id ? updatedMember : member
          );
          return {
            ...team,
            faculty: updatedFaculty,
            students: updatedStudents,
          };
        } else {
          // Add new member
          if (updatedMember.memberType === "faculty") {
            return { ...team, faculty: [...team.faculty, updatedMember] };
          } else if (updatedMember.memberType === "student") {
            return { ...team, students: [...team.students, updatedMember] };
          }
        }
      }
      return team;
    });
    setTeams(updatedTeams);
    setEditingMember(null); // Close the edit form/modal
  };

  // Function to handle team name change (only accepts string)
  const handleTeamNameChange = (field: "name", value: any) => {
    setNewTeamName(value);
  };

  // Handle member deletion and update local state
  const handleDeleteMember = (
    teamId: number,
    memberId: number,
    memberType: "faculty" | "students" | "head"
  ) => {
    deleteProfileById(memberId);

    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        if (memberType === "head") {
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
            [memberType]: (team[memberType] as TeamMemberProps[]).filter(
              (member) => member.id !== memberId
            ),
          };
        }
      }
      return team;
    });

    setTeams(updatedTeams);
  };
  type TeamMemberProps = {
    id: number;
    teamId: number;
    name: string;
    role: string;
    memberType: string;
    image: string | File | null;
    social: { [key: string]: string };
  };
  const handleFieldChange = (
    field: keyof TeamMemberProps,
    value: string | File
  ) => {
    setEditingMember((prevMember) =>
      prevMember ? { ...prevMember, [field]: value } : null
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          NSS Team Dashboard
        </h1>
        {!isCreatingTeam ? (
          <button
            onClick={handleCreateTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
          >
            <Plus size={20} className="mr-2" /> Create New Team
          </button>
        ) : (
          <FormModal
            title="Create New Team"
            formData={{ name: newTeamName }}
            renderFields={(data, handleChange) => (
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Enter team name"
              />
            )}
            onCancel={() => setIsCreatingTeam(false)}
            onSave={handleSubmitNewTeam}
            handleChange={handleTeamNameChange} // Handle only string here
          />
        )}

        {teams.map((team) => (
          <CollapsibleList
            key={team.id}
            title={team.name}
            items={[team.head, ...team.faculty, ...team.students]}
            renderItem={(member) => (
              <TeamCard
                key={member.id}
                data={member}
                displayFields={(item) => [
                  { label: "Name", value: item.name },
                  { label: "Role", value: item.role },
                  { label: "Type", value: item.memberType },
                ]}
                onEdit={() => setEditingMember(member)}
                onDelete={() =>
                  handleDeleteMember(
                    team.id,
                    member.id,
                    member.memberType as "faculty" | "students" | "head"
                  )
                }
              />
            )}
            onAddItem={() =>
              setEditingMember({ ...defaultMember, teamId: team.id })
            }
          />
        ))}

        {editingMember && (
          <FormModal
            title="Edit Member"
            formData={editingMember}
            renderFields={(data, handleChange) => (
              <>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Enter member name"
                />
                <input
                  type="text"
                  value={data.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Enter member role"
                />
                <select
                  value={data.memberType}
                  onChange={(e) => handleChange("memberType", e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                  disabled={data.memberType === "head"} // Disable if the memberType is 'head'
                >
                  {data.memberType === "head" ? (
                    <option value="head">Head (NSS Co-Ordinator)</option>
                  ) : (
                    <>
                      <option value="faculty">Faculty</option>
                      <option value="student">Student</option>
                    </>
                  )}
                </select>
                <input
                  type="file"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target && target.files) {
                      setEditingMember({
                        ...editingMember,
                        image: target.files[0],
                      });
                    }
                  }}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={editingMember.social.linkedin || ""}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      social: {
                        ...editingMember.social,
                        linkedin: e.target.value,
                      },
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
                      social: {
                        ...editingMember.social,
                        facebook: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border rounded-md mb-4"
                  placeholder="Facebook URL"
                />
              </>
            )}
            onCancel={() => setEditingMember(null)}
            onSave={() => handleSaveMember(editingMember, !!editingMember.id)}
            handleChange={handleFieldChange}
          />
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;
