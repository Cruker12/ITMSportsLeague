using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class MatchResultRequestDTO
{
    [Required(ErrorMessage = "Los goles del local son obligatorios.")]
    [Range(0, 100, ErrorMessage = "Los goles del local deben estar entre 0 y 100.")]
    public int HomeGoals { get; set; }

    [Required(ErrorMessage = "Los goles del visitante son obligatorios.")]
    [Range(0, 100, ErrorMessage = "Los goles del visitante deben estar entre 0 y 100.")]
    public int AwayGoals { get; set; }

    [StringLength(500, ErrorMessage = "Las observaciones no pueden exceder 500 caracteres.")]
    public string? Observations { get; set; }
}
