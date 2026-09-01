using System.ComponentModel.DataAnnotations;
using SportsLeague.Domain.Enums;

namespace SportsLeague.API.DTOs.Request;

public class PlayerRequestDTO
{
    [Required(ErrorMessage = "El nombre del jugador es obligatorio.")]
    [StringLength(80, ErrorMessage = "El nombre no puede exceder 80 caracteres.")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "El apellido del jugador es obligatorio.")]
    [StringLength(80, ErrorMessage = "El apellido no puede exceder 80 caracteres.")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "La fecha de nacimiento es obligatoria.")]
    public DateTime BirthDate { get; set; }

    [Required(ErrorMessage = "El numero de camiseta es obligatorio.")]
    [Range(1, 99, ErrorMessage = "El numero de camiseta debe estar entre 1 y 99.")]
    public int Number { get; set; }

    [Required(ErrorMessage = "La posicion es obligatoria.")]
    public PlayerPosition Position { get; set; }

    [Required(ErrorMessage = "El ID del equipo es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del equipo debe ser mayor a 0.")]
    public int TeamId { get; set; }
}
