using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Enums;

namespace SportsLeague.Domain.Interfaces.Services;

public interface ITournamentService
{
    Task<IEnumerable<Tournament>> GetAllAsync(int? page = null, int? pageSize = null);
    Task<int> GetCountAsync();
    Task<Tournament?> GetByIdAsync(int id);
    Task<Tournament> CreateAsync(Tournament tournament);
    Task UpdateAsync(int id, Tournament tournament);
    Task DeleteAsync(int id);
    Task UpdateStatusAsync(int id, TournamentStatus newStatus);
    Task RegisterTeamAsync(int tournamentId, int teamId);
    Task<IEnumerable<Team>> GetTeamsByTournamentAsync(int tournamentId);
}
