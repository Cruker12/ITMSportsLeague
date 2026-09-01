using System.ComponentModel.DataAnnotations;
using SportsLeague.Domain.Enums;

namespace SportsLeague.API.DTOs.Request;

public class SponsorRequestDTO
{
    [Required(ErrorMessage = "El nombre del patrocinador es obligatorio.")]
    [StringLength(150, ErrorMessage = "El nombre no puede exceder 150 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email de contacto es obligatorio.")]
    [StringLength(200, ErrorMessage = "El email no puede exceder 200 caracteres.")]
    [EmailAddress(ErrorMessage = "El formato del email no es valido.")]
    public string ContactEmail { get; set; } = string.Empty;

    [StringLength(30, ErrorMessage = "El telefono no puede exceder 30 caracteres.")]
    public string? Phone { get; set; }

    [StringLength(500, ErrorMessage = "La URL del sitio web no puede exceder 500 caracteres.")]
    public string? WebsiteUrl { get; set; }

    [Required(ErrorMessage = "La categoria es obligatoria.")]
    public SponsorCategory Category { get; set; }
}
