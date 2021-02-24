import { CreatePokemonDto, Team, TeamPokemon } from "shared/interfaces";
import { axios } from "utils/axios";
import { ErrorFactory } from "utils/ErrorFactory";
import { toTeam, toTeamPokemon } from "utils/mapper";

interface TeamService {
  getTeams: () => Promise<Team[]>;
  getTeamById: (teamId: string) => Promise<Team>;
  createTeam: (name?: string) => Promise<Team>;
  addPokemon: (teamId: string, createPokemonDto: CreatePokemonDto) => Promise<TeamPokemon>;
  updatePokemon: (
    pokemonId: string,
    updatePokemonDto: Partial<CreatePokemonDto>
  ) => Promise<TeamPokemon>;
  deleteTeam: (teamId: string) => Promise<boolean>;
}

export const teamService: TeamService = class {
  public static async getTeams() {
    try {
      const res = await axios.get("/teams");
      return res.data.map(toTeam);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async createTeam(name?: string) {
    try {
      const res = await axios.post("/teams", { name });
      return toTeam(res.data);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async addPokemon(teamId: string, createPokemonDto: CreatePokemonDto) {
    try {
      const res = await axios.post(`/teams/add_pokemon/${teamId}`, createPokemonDto);
      return toTeamPokemon(res.data);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async updatePokemon(
    pokemonId: string,
    updatePokemonDto: Partial<CreatePokemonDto>
  ) {
    try {
      const res = await axios.patch(`/pokemons/${pokemonId}`, updatePokemonDto);
      return toTeamPokemon(res.data);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async deleteTeam(teamId: string) {
    try {
      await axios.delete(`/teams/${teamId}`);
      return true;
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }

  public static async getTeamById(teamId: string) {
    try {
      const res = await axios.get(`/teams/${teamId}`);
      return toTeam(res.data);
    } catch (err) {
      throw ErrorFactory.get(err);
    }
  }
};
