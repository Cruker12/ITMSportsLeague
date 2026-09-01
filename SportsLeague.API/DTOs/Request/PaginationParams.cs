using System.ComponentModel.DataAnnotations;

namespace SportsLeague.API.DTOs.Request;

public class PaginationParams
{
    private const int MaxPageSize = 100;
    private int _pageSize = 10;

    [Range(1, int.MaxValue, ErrorMessage = "La pagina debe ser mayor a 0.")]
    public int Page { get; set; } = 1;

    [Range(1, 100, ErrorMessage = "El tamano de pagina debe estar entre 1 y 100.")]
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}
