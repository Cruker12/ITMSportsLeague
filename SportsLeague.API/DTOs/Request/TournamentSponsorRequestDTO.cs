using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class TournamentSponsorRequestDTO
{
    [Required(ErrorMessage = "El ID del torneo es obligatorio.")]
    [Range(1, int.MaxValue, ErrorMessage = "El ID del torneo debe ser mayor a 0.")]
    public int TournamentId { get; set; }

    [Required(ErrorMessage = "El monto del contrato es obligatorio.")]
    [Range(0.01, 9999999999999999.99, ErrorMessage = "El monto del contrato debe estar entre 0.01 y 9999999999999999.99.")]
    public decimal ContractAmount { get; set; }
}
