using System.ComponentModel.DataAnnotations;
using SportsLeague.Domain.Enums;

namespace SportsLeague.API.DTOs.Request;

public class UpdateMatchStatusDTO
{
    [Required(ErrorMessage = "El estado es obligatorio.")]
    public MatchStatus Status { get; set; }
}
