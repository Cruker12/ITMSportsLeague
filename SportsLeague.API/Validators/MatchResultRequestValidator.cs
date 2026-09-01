using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class MatchResultRequestValidator : AbstractValidator<MatchResultRequestDTO>
{
    public MatchResultRequestValidator()
    {
        RuleFor(x => x.HomeGoals)
            .InclusiveBetween(0, 100).WithMessage("Los goles del local deben estar entre 0 y 100.");

        RuleFor(x => x.AwayGoals)
            .InclusiveBetween(0, 100).WithMessage("Los goles del visitante deben estar entre 0 y 100.");

        RuleFor(x => x.Observations)
            .MaximumLength(500).WithMessage("Las observaciones no pueden exceder 500 caracteres.")
            .When(x => !string.IsNullOrEmpty(x.Observations));
    }
}
