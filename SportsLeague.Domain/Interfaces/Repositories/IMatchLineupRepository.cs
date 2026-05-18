using SportsLeague.Domain.Entities;

namespace SportsLeague.Domain.Interfaces.Repositories;

public interface IMatchLineupRepository : IGenericRepository<MatchLineup>
{
    ///  Obtiene la alineación completa de un partido (con datos de jugador y equipo).
    ///  obtains the complete lineup of a match (with player and team data).
    Task<IEnumerable<MatchLineup>> GetByMatchAsync(int matchId);

    ///  Obtiene la alineación de un equipo específico dentro de un partido.
    ///  obtains the lineup of a specific team within a match.
    Task<IEnumerable<MatchLineup>> GetByMatchAndTeamAsync(int matchId, int teamId);

    ///  Verifica si un jugador ya está registrado en la alineación de un partido.
    ///  checks if a player is already registered in the lineup of a match.
    Task<bool> ExistsByMatchAndPlayerAsync(int matchId, int playerId);

    ///  Cuenta los titulares de un equipo en un partido (para validar máximo 11).
    ///  Counts the starters of a team in a match (to validate maximum 11).
    Task<int> CountStartersByMatchAndTeamAsync(int matchId, int teamId);
}