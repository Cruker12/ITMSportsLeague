using FluentValidation;
using SportsLeague.API.DTOs.Request;

namespace SportsLeague.API.Validators;

public class SponsorRequestValidator : AbstractValidator<SponsorRequestDTO>
{
    public SponsorRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre del patrocinador es obligatorio.")
            .MaximumLength(150).WithMessage("El nombre no puede exceder 150 caracteres.");

        RuleFor(x => x.ContactEmail)
            .NotEmpty().WithMessage("El email de contacto es obligatorio.")
            .MaximumLength(200).WithMessage("El email no puede exceder 200 caracteres.")
            .EmailAddress().WithMessage("El formato del email no es valido.");

        RuleFor(x => x.Phone)
            .MaximumLength(30).WithMessage("El telefono no puede exceder 30 caracteres.")
            .When(x => !string.IsNullOrEmpty(x.Phone));

        RuleFor(x => x.WebsiteUrl)
            .MaximumLength(500).WithMessage("La URL del sitio web no puede exceder 500 caracteres.")
            .When(x => !string.IsNullOrEmpty(x.WebsiteUrl));

        RuleFor(x => x.Category)
            .IsInEnum().WithMessage("La categoria especificada no es valida.");
    }
}
