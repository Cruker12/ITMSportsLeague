using SportsLeague.Domain.Entities;

namespace SportsLeague.Domain.Interfaces.Services;

public interface ISponsorService
{
    Task<IEnumerable<Sponsor>> GetAllAsync();
    Task<Sponsor?> GetByIdAsync(int id);
    Task<Sponsor> CreateAsync(Sponsor sponsor);
    Task UpdateAsync(int id, Sponsor sponsor);
    Task DeleteAsync(int id);

    // Relación N:M con Tournament
    Task<TournamentSponsor> RegisterSponsorToTournamentAsync(int sponsorId, int tournamentId, decimal contractAmount);
    Task RemoveSponsorFromTournamentAsync(int sponsorId, int tournamentId);
    Task<IEnumerable<TournamentSponsor>> GetTournamentsBySponsorAsync(int sponsorId);
}