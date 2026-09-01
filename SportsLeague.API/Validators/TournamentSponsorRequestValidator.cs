using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class TournamentSponsorRequestValidator : AbstractValidator<TournamentSponsorRequestDTO>
{
    public TournamentSponsorRequestValidator()
    {
        RuleFor(x => x.TournamentId)
            .GreaterThan(0).WithMessage("El ID del torneo debe ser mayor a 0.");

        RuleFor(x => x.ContractAmount)
            .GreaterThan(0).WithMessage("El monto del contrato debe ser mayor a 0.")
            .LessThanOrEqualTo(9999999999999999.99m).WithMessage("El monto del contrato excede el limite permitido.");
    }
}
