using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class RefereeRequestValidator : AbstractValidator<RefereeRequestDTO>
{
    public RefereeRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("El nombre del arbitro es obligatorio.")
            .MaximumLength(80).WithMessage("El nombre no puede exceder 80 caracteres.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("El apellido del arbitro es obligatorio.")
            .MaximumLength(80).WithMessage("El apellido no puede exceder 80 caracteres.");

        RuleFor(x => x.Nationality)
            .NotEmpty().WithMessage("La nacionalidad es obligatoria.")
            .MaximumLength(80).WithMessage("La nacionalidad no puede exceder 80 caracteres.");
    }
}
