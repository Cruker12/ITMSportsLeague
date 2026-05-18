using SportsLeague.Domain.Enums;

namespace SportsLeague.Domain.Entities;

public class Match : AuditBase
{
    public int TournamentId { get; set; }
    public int HomeTeamId { get; set; }
    public int AwayTeamId { get; set; }
    public int RefereeId { get; set; }
    public DateTime MatchDate { get; set; }
    public string Venue { get; set; } = string.Empty;
    public int Matchday { get; set; }
    public MatchStatus Status { get; set; } = MatchStatus.Scheduled;

    // Navigation Properties
    public Tournament Tournament { get; set; } = null!;
    public Team HomeTeam { get; set; } = null!;
    public Team AwayTeam { get; set; } = null!;
    public Referee Referee { get; set; } = null!;

    // Relación 1:1 con resultado (relation 1:1 with result)
    public MatchResult? MatchResult { get; set; }

    // Relación 1:N con goles y tarjetas (relation 1:N with goals and cards)
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    public ICollection<Card> Cards { get; set; } = new List<Card>();

    // Relación 1:N con alineaciones ( relation 1:N with lineups)
    public ICollection<MatchLineup> Lineups { get; set; } = new List<MatchLineup>();

}