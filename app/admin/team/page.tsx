"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash, ChevronDown, ChevronUp, X } from "lucide-react";
import {
  createTeamWithCustomID,
  fetchAllTeams,
  saveMember,
  deleteProfileById,
} from "@/api/index";
import { TeamProps, TeamMemberProps } from "@/types/index";
import FormModal from "@/app/components/ui/FormModal";

const defaultMember: TeamMemberProps = {
  id: Date.now(),
  teamId: 0,
  name: "",
  role: "",
  memberType: "",
  image: File,
  social: {},
};

const TeamDashboard: React.FC = () => {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMemberProps | null>(
    null
  );
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  // Fetching teams from the backend on load
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await fetchAllTeams();
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

  const handleSubmitNewTeam = () => {
    const newTeamId = Date.now();
    const newTeam: TeamProps = {
      id: newTeamId,
      name: newTeamName,
      head: { ...defaultMember, id: newTeamId, role: "NSS Co-Ordinator" },
      faculty: [],
      students: [],
    };
    createTeamWithCustomID(newTeamName, { name: newTeamName, id: newTeamId });
    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setIsCreatingTeam(false);
    setNewTeamName("");
  };

  // Function to handle team name change (only accepts string)
  const handleTeamNameChange = (field: "name", value: any ) => {
    setNewTeamName(value);
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
                {/* Head Coordinator */}
                <h3 className="text-lg font-semibold mb-2">Head Coordinator</h3>
                {/* Faculty and Students sections */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDashboard;
