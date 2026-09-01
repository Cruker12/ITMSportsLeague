using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class MatchRequestDTO
{
    [Required(ErrorMessage = "El ID del torneo es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del torneo debe ser mayor a 0.")]
    public int TournamentId { get; set; }

    [Required(ErrorMessage = "El ID del equipo local es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del equipo local debe ser mayor a 0.")]
    public int HomeTeamId { get; set; }

    [Required(ErrorMessage = "El ID del equipo visitante es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del equipo visitante debe ser mayor a 0.")]
    public int AwayTeamId { get; set; }

    [Required(ErrorMessage = "El ID del arbitro es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del arbitro debe ser mayor a 0.")]
    public int RefereeId { get; set; }

    [Required(ErrorMessage = "La fecha del partido es obligatoria.")]
    public DateTime MatchDate { get; set; }

    [StringLength(150, ErrorMessage = "El recinto no puede exceder 150 caracteres.")]
    public string Venue { get; set; } = string.Empty;

    [Required(ErrorMessage = "La jornada es obligatoria.")]
    [Range(1, int.MaxValue, ErrorMessage = "La jornada debe ser mayor a 0.")]
    public int Matchday { get; set; }
}
