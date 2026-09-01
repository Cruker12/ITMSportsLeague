using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class TeamRequestValidator : AbstractValidator<TeamRequestDTO>
{
    public TeamRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre del equipo es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre del equipo no puede exceder 100 caracteres.");

        RuleFor(x => x.City)
            .NotEmpty().WithMessage("La ciudad es obligatoria.")
            .MaximumLength(100).WithMessage("La ciudad no puede exceder 100 caracteres.");

        RuleFor(x => x.Stadium)
            .MaximumLength(150).WithMessage("El estadio no puede exceder 150 caracteres.");

        RuleFor(x => x.LogoUrl)
            .MaximumLength(500).WithMessage("La URL del logo no puede exceder 500 caracteres.")
            .When(x => !string.IsNullOrEmpty(x.LogoUrl));

        RuleFor(x => x.FoundedDate)
            .LessThan(DateTime.UtcNow).WithMessage("La fecha de fundacion debe ser en el pasado.");
    }
}
