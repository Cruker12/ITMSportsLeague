using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class RegisterTeamValidator : AbstractValidator<RegisterTeamDTO>
{
    public RegisterTeamValidator()
    {
        RuleFor(x => x.TeamId)
            .GreaterThan(0).WithMessage("El ID del equipo debe ser mayor a 0.");
    }
}
