using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class UpdateStatusValidator : AbstractValidator<UpdateStatusDTO>
{
    public UpdateStatusValidator()
    {
        RuleFor(x => x.Status)
            .IsInEnum().WithMessage("El estado del torneo especificado no es valido.");
    }
}
