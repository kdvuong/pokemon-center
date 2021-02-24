import { useTeam } from "hooks/TeamHook";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Team } from "shared/interfaces";
import CreateTeamModal from "./CreateTeamModal";
import TeamCard from "./TeamCard";

interface IProps {}

const TeamBuilderView: FunctionComponent<IProps> = () => {
  const { getTeams, createTeam, deleteTeam } = useTeam();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getTeams().then((teams) => {
      setTeams(teams);
    });
  }, [getTeams]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGetTeams = useCallback(async () => {
    const teams = await getTeams();
    console.log(teams);
  }, [getTeams]);

  const handleCreateTeamSuccess = useCallback(
    (newTeam: Team) => {
      setTeams([...teams, newTeam]);
    },
    [teams]
  );

  const handleDelete = useCallback(
    async (teamId: string) => {
      // optimistic rendering here
      const prevTeams = [...teams];
      setTeams(teams.filter((t) => t.id !== teamId));
      try {
        await deleteTeam(teamId);
      } catch (err) {
        setTeams(prevTeams);
      }
    },
    [deleteTeam, teams]
  );

  return (
    <div className="container">
      {teams.map((team) => (
        <TeamCard team={team} key={team.id} onDelete={handleDelete} />
      ))}

      <button onClick={handleGetTeams}>get teams</button>
      <button onClick={handleOpen}>create team</button>
      <CreateTeamModal
        open={isOpen}
        onClose={handleClose}
        onCreateTeam={createTeam}
        onCreateSuccess={handleCreateTeamSuccess}
      />
    </div>
  );
};

export default TeamBuilderView;
