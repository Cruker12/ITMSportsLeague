using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class UpdateMatchStatusValidator : AbstractValidator<UpdateMatchStatusDTO>
{
    public UpdateMatchStatusValidator()
    {
        RuleFor(x => x.Status)
            .IsInEnum().WithMessage("El estado del partido especificado no es valido.");
    }
}
