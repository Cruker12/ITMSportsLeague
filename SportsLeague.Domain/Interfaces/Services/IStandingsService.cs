using SportsLeague.Domain.DTOs;

namespace SportsLeague.Domain.Interfaces.Services;

public interface IStandingsService
{
    Task<List<StandingDTO>> GetStandingsAsync(int tournamentId);
    Task<List<TopScorerDTO>> GetTopScorersAsync(int tournamentId);
    Task<List<CardStatsDTO>> GetCardStatsAsync(int tournamentId);
}
