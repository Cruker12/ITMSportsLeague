using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class RegisterTeamDTO
{
    [Required(ErrorMessage = "El ID del equipo es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del equipo debe ser mayor a 0.")]
    public int TeamId { get; set; }
}
