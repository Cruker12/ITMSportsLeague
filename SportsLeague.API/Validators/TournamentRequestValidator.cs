using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class TournamentRequestValidator : AbstractValidator<TournamentRequestDTO>
{
    public TournamentRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre del torneo es obligatorio.")
            .MaximumLength(150).WithMessage("El nombre no puede exceder 150 caracteres.");

        RuleFor(x => x.Season)
            .NotEmpty().WithMessage("La temporada es obligatoria.")
            .MaximumLength(20).WithMessage("La temporada no puede exceder 20 caracteres.")
            .Matches(@"^\d{4}-\d{4}$").WithMessage("La temporada debe tener el formato AAAA-AAAA (ej: 2025-2026).");

        RuleFor(x => x.EndDate)
            .GreaterThan(x => x.StartDate).WithMessage("La fecha de fin debe ser posterior a la fecha de inicio.");
    }
}
