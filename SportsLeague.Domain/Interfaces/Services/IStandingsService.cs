namespace SportsLeague.Domain.Interfaces.Services;

public interface IStandingsService
{
    Task<object> GetStandingsAsync(int tournamentId); // Obtener la tabla de posiciones del torneo
    Task<object> GetTopScorersAsync(int tournamentId); // Obtener la lista de los máximos goleadores del torneo
    Task<object> GetCardStatsAsync(int tournamentId); // Obtener la lista de los jugadores con más tarjetas (amarillas y rojas) del torneo
}