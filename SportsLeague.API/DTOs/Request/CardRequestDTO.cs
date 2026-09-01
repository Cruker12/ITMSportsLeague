using System.ComponentModel.DataAnnotations;
using SportsLeague.Domain.Enums;

namespace SportsLeague.API.DTOs.Request;

public class CardRequestDTO
{
    [Required(ErrorMessage = "El ID del jugador es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del jugador debe ser mayor a 0.")]
    public int PlayerId { get; set; }

    [Required(ErrorMessage = "El minuto es obligatorio.")]
    [Range(0, 120, ErrorMessage = "El minuto debe estar entre 0 y 120.")]
    public int Minute { get; set; }

    [Required(ErrorMessage = "El tipo de tarjeta es obligatorio.")]
    public CardType Type { get; set; }
}
