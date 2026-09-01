using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class MatchRequestValidator : AbstractValidator<MatchRequestDTO>
{
    public MatchRequestValidator()
    {
        RuleFor(x => x.TournamentId)
            .GreaterThan(0).WithMessage("El ID del torneo debe ser mayor a 0.");

        RuleFor(x => x.HomeTeamId)
            .GreaterThan(0).WithMessage("El ID del equipo local debe ser mayor a 0.");

        RuleFor(x => x.AwayTeamId)
            .GreaterThan(0).WithMessage("El ID del equipo visitante debe ser mayor a 0.")
            .NotEqual(x => x.HomeTeamId).WithMessage("El equipo local y el visitante no pueden ser el mismo.");

        RuleFor(x => x.RefereeId)
            .GreaterThan(0).WithMessage("El ID del arbitro debe ser mayor a 0.");

        RuleFor(x => x.MatchDate)
            .NotEmpty().WithMessage("La fecha del partido es obligatoria.");

        RuleFor(x => x.Venue)
            .MaximumLength(150).WithMessage("El recinto no puede exceder 150 caracteres.");

        RuleFor(x => x.Matchday)
            .GreaterThan(0).WithMessage("La jornada debe ser mayor a 0.");
    }
}
