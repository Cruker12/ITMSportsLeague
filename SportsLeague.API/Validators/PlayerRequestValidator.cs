using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class PlayerRequestValidator : AbstractValidator<PlayerRequestDTO>
{
    public PlayerRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("El nombre del jugador es obligatorio.")
            .MaximumLength(80).WithMessage("El nombre no puede exceder 80 caracteres.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("El apellido del jugador es obligatorio.")
            .MaximumLength(80).WithMessage("El apellido no puede exceder 80 caracteres.");

        RuleFor(x => x.BirthDate)
            .LessThan(DateTime.UtcNow).WithMessage("La fecha de nacimiento debe ser en el pasado.");

        RuleFor(x => x.Number)
            .InclusiveBetween(1, 99).WithMessage("El numero de camiseta debe estar entre 1 y 99.");

        RuleFor(x => x.Position)
            .IsInEnum().WithMessage("La posicion especificada no es valida.");

        RuleFor(x => x.TeamId)
            .GreaterThan(0).WithMessage("El ID del equipo debe ser mayor a 0.");
    }
}
