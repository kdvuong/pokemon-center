import { useCallback } from "react";
import { teamService } from "services/TeamService";
import { CreatePokemonDto, Team, TeamPokemon } from "shared/interfaces";
import isEqual from "lodash-es/isEqual";

interface ITeam {
  getTeams: () => Promise<Team[]>;
  getTeamById: (teamId: string) => Promise<Team>;
  createTeam: (name?: string) => Promise<Team>;
  deleteTeam: (teamId: string) => Promise<boolean>;
  addPokemon: (teamId: string, createPokemonDto: CreatePokemonDto) => Promise<TeamPokemon>;
  updatePokemon: (
    currentPokemon: TeamPokemon,
    updatePokemonDto: Partial<CreatePokemonDto>
  ) => Promise<TeamPokemon>;
  deletePokemon: (pokemonId: string) => Promise<boolean>;
}

export const useTeam = (): ITeam => {
  const getTeams = useCallback(() => {
    return teamService.getTeams();
  }, []);

  const getTeamById = useCallback((teamId: string) => {
    return teamService.getTeamById(teamId);
  }, []);

  const createTeam = useCallback((name?: string) => {
    return teamService.createTeam(name);
  }, []);

  const deleteTeam = useCallback((teamId: string) => {
    return teamService.deleteTeam(teamId);
  }, []);

  const addPokemon = useCallback((teamId, createPokemonDto) => {
    return teamService.addPokemon(teamId, createPokemonDto);
  }, []);

  const updatePokemon = useCallback(
    (currentPokemon: TeamPokemon, updatePokemonDto: Partial<CreatePokemonDto>) => {
      const { id, ...rest } = currentPokemon;
      if (isEqual(rest, updatePokemonDto)) {
        return Promise.resolve(currentPokemon);
      }
      return teamService.updatePokemon(id, updatePokemonDto);
    },
    []
  );

  const deletePokemon = useCallback((pokemonId: string) => {
    return teamService.deletePokemon(pokemonId);
  }, []);

  return {
    getTeams,
    getTeamById,
    createTeam,
    deleteTeam,
    addPokemon,
    updatePokemon,
    deletePokemon,
  };
};
