using Microsoft.Extensions.Logging;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Repositories;
using SportsLeague.Domain.Interfaces.Services;
using System.Net.Mail;

namespace SportsLeague.Domain.Services;

public class SponsorService : ISponsorService
{
    private readonly ISponsorRepository _sponsorRepository;
    private readonly ITournamentSponsorRepository _tournamentSponsorRepository;
    private readonly ITournamentRepository _tournamentRepository;
    private readonly ILogger<SponsorService> _logger;

    public SponsorService(
        ISponsorRepository sponsorRepository,
        ITournamentSponsorRepository tournamentSponsorRepository,
        ITournamentRepository tournamentRepository,
        ILogger<SponsorService> logger)
    {
        _sponsorRepository = sponsorRepository;
        _tournamentSponsorRepository = tournamentSponsorRepository;
        _tournamentRepository = tournamentRepository;
        _logger = logger;
    }

    // ── GET ALL ──────────────────────────────────────────────────────────
    public async Task<IEnumerable<Sponsor>> GetAllAsync()
    {
        _logger.LogInformation("Retrieving all sponsors");
        return await _sponsorRepository.GetAllAsync();
    }

    // ── GET BY ID ────────────────────────────────────────────────────────
    public async Task<Sponsor?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Retrieving sponsor with ID: {SponsorId}", id);
        var sponsor = await _sponsorRepository.GetByIdAsync(id);
        if (sponsor == null)
            _logger.LogWarning("Sponsor with ID {SponsorId} not found", id);
        return sponsor;
    }

    // ── CREATE ───────────────────────────────────────────────────────────
    public async Task<Sponsor> CreateAsync(Sponsor sponsor)
    {
        _logger.LogInformation("Creating sponsor: {Name}", sponsor.Name);

        ValidateEmail(sponsor.ContactEmail);

        if (await _sponsorRepository.ExistsByNameAsync(sponsor.Name))
            throw new InvalidOperationException(
                $"Ya existe un patrocinador con el nombre '{sponsor.Name}'.");

        return await _sponsorRepository.CreateAsync(sponsor);
    }

    // ── UPDATE ───────────────────────────────────────────────────────────
    public async Task UpdateAsync(int id, Sponsor sponsor)
    {
        var existing = await _sponsorRepository.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"No se encontró el patrocinador con ID {id}.");

        ValidateEmail(sponsor.ContactEmail);

        if (await _sponsorRepository.ExistsByNameAsync(sponsor.Name, excludeId: id))
            throw new InvalidOperationException(
                $"Ya existe otro patrocinador con el nombre '{sponsor.Name}'.");

        existing.Name = sponsor.Name;
        existing.ContactEmail = sponsor.ContactEmail;
        existing.Phone = sponsor.Phone;
        existing.WebsiteUrl = sponsor.WebsiteUrl;
        existing.Category = sponsor.Category;
        existing.UpdatedAt = DateTime.UtcNow;

        _logger.LogInformation("Updating sponsor with ID: {SponsorId}", id);
        await _sponsorRepository.UpdateAsync(existing);
    }

    // ── DELETE ───────────────────────────────────────────────────────────
    public async Task DeleteAsync(int id)
    {
        if (!await _sponsorRepository.ExistsAsync(id))
            throw new KeyNotFoundException($"No se encontró el patrocinador con ID {id}.");

        _logger.LogInformation("Deleting sponsor with ID: {SponsorId}", id);
        await _sponsorRepository.DeleteAsync(id);
    }

    // ── REGISTER SPONSOR TO TOURNAMENT ──────────────────────────────────
    public async Task<TournamentSponsor> RegisterSponsorToTournamentAsync(
        int sponsorId, int tournamentId, decimal contractAmount)
    {
        _logger.LogInformation(
            "Registering sponsor {SponsorId} to tournament {TournamentId}", sponsorId, tournamentId);

        if (!await _sponsorRepository.ExistsAsync(sponsorId))
            throw new KeyNotFoundException($"No se encontró el patrocinador con ID {sponsorId}.");

        if (!await _tournamentRepository.ExistsAsync(tournamentId))
            throw new KeyNotFoundException($"No se encontró el torneo con ID {tournamentId}.");

        if (contractAmount <= 0)
            throw new InvalidOperationException(
                "El monto del contrato (ContractAmount) debe ser mayor a 0.");

        var existing = await _tournamentSponsorRepository
            .GetByTournamentAndSponsorAsync(tournamentId, sponsorId);

        if (existing != null)
            throw new InvalidOperationException(
                $"El patrocinador {sponsorId} ya está vinculado al torneo {tournamentId}.");

        var tournamentSponsor = new TournamentSponsor
        {
            TournamentId = tournamentId,
            SponsorId = sponsorId,
            ContractAmount = contractAmount,
            JoinedAt = DateTime.UtcNow
        };

        return await _tournamentSponsorRepository.CreateAsync(tournamentSponsor);
    }

    // ── REMOVE SPONSOR FROM TOURNAMENT ──────────────────────────────────
    public async Task RemoveSponsorFromTournamentAsync(int sponsorId, int tournamentId)
    {
        _logger.LogInformation(
            "Removing sponsor {SponsorId} from tournament {TournamentId}", sponsorId, tournamentId);

        var link = await _tournamentSponsorRepository
            .GetByTournamentAndSponsorAsync(tournamentId, sponsorId)
            ?? throw new KeyNotFoundException(
                $"El patrocinador {sponsorId} no está vinculado al torneo {tournamentId}.");

        await _tournamentSponsorRepository.DeleteAsync(link.Id);
    }

    // ── GET TOURNAMENTS BY SPONSOR ───────────────────────────────────────
    public async Task<IEnumerable<TournamentSponsor>> GetTournamentsBySponsorAsync(int sponsorId)
    {
        _logger.LogInformation("Retrieving tournaments for sponsor {SponsorId}", sponsorId);

        if (!await _sponsorRepository.ExistsAsync(sponsorId))
            throw new KeyNotFoundException($"No se encontró el patrocinador con ID {sponsorId}.");

        return await _tournamentSponsorRepository.GetBySponsorIdAsync(sponsorId);
    }

    // ── PRIVATE HELPERS ─────────────────────────────────────────────────
    private static void ValidateEmail(string email)
    {
        try { _ = new MailAddress(email); }
        catch { throw new InvalidOperationException($"El email '{email}' no tiene un formato válido."); }
    }
}