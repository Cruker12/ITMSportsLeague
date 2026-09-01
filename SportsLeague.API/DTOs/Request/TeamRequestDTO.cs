using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class TeamRequestDTO
{
    [Required(ErrorMessage = "El nombre del equipo es obligatorio.")]
    [StringLength(100, ErrorMessage = "El nombre del equipo no puede exceder 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "La ciudad es obligatoria.")]
    [StringLength(100, ErrorMessage = "La ciudad no puede exceder 100 caracteres.")]
    public string City { get; set; } = string.Empty;

    [StringLength(150, ErrorMessage = "El estadio no puede exceder 150 caracteres.")]
    public string Stadium { get; set; } = string.Empty;

    [StringLength(500, ErrorMessage = "La URL del logo no puede exceder 500 caracteres.")]
    public string? LogoUrl { get; set; }

    [Required(ErrorMessage = "La fecha de fundacion es obligatoria.")]
    public DateTime FoundedDate { get; set; }
}
