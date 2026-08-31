namespace SportsLeague.Domain.DTOs;

public class StandingDTO
{
    public int Position { get; set; }
    public int TeamId { get; set; }
    public string TeamName { get; set; } = string.Empty;
    public int MatchesPlayed { get; set; }
    public int Wins { get; set; }
    public int Draws { get; set; }
    public int Losses { get; set; }
    public int GoalsFor { get; set; }
    public int GoalsAgainst { get; set; }
    public int GoalDifference { get; set; }
    public int Points { get; set; }
}

public class TopScorerDTO
{
    public int PlayerId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
    public string TeamName { get; set; } = string.Empty;
    public int Goals { get; set; }
    public int Penalties { get; set; }
    public int MatchesWithGoals { get; set; }
}

public class CardStatsDTO
{
    public int PlayerId { get; set; }
    public string PlayerName { get; set; } = string.Empty;
    public string TeamName { get; set; } = string.Empty;
    public int YellowCards { get; set; }
    public int RedCards { get; set; }
    public int TotalCards { get; set; }
}
