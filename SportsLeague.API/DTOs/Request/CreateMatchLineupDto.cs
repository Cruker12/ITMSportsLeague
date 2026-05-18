using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class CreateMatchLineupDto
{
    [Required]
    public int PlayerId { get; set; }

    [Required]
    public bool IsStarter { get; set; }

    [Required]
    [MaxLength(10)]
    public string Position { get; set; } = string.Empty;   // "GK", "CB", "CDM", "ST", etc.
}