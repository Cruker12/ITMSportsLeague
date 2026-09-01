using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class CardRequestValidator : AbstractValidator<CardRequestDTO>
{
    public CardRequestValidator()
    {
        RuleFor(x => x.PlayerId)
            .GreaterThan(0).WithMessage("El ID del jugador debe ser mayor a 0.");

        RuleFor(x => x.Minute)
            .InclusiveBetween(0, 120).WithMessage("El minuto debe estar entre 0 y 120.");

        RuleFor(x => x.Type)
            .IsInEnum().WithMessage("El tipo de tarjeta especificado no es valido.");
    }
}
