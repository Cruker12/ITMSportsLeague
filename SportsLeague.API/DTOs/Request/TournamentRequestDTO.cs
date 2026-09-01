using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class TournamentRequestDTO
{
    [Required(ErrorMessage = "El nombre del torneo es obligatorio.")]
    [StringLength(150, ErrorMessage = "El nombre no puede exceder 150 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "La temporada es obligatoria.")]
    [StringLength(20, ErrorMessage = "La temporada no puede exceder 20 caracteres.")]
    [RegularExpression(@"^\d{4}-\d{4}$", ErrorMessage = "La temporada debe tener el formato AAAA-AAAA (ej: 2025-2026).")]
    public string Season { get; set; } = string.Empty;

    [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "La fecha de fin es obligatoria.")]
    public DateTime EndDate { get; set; }
}
