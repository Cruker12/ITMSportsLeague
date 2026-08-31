using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SponsorController : ControllerBase
{
    private readonly ISponsorService _sponsorService;
    private readonly IMapper _mapper;

    public SponsorController(ISponsorService sponsorService, IMapper mapper)
    {
        _sponsorService = sponsorService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SponsorResponseDTO>>> GetAll()
    {
        var sponsors = await _sponsorService.GetAllAsync();
        return Ok(_mapper.Map<IEnumerable<SponsorResponseDTO>>(sponsors));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SponsorResponseDTO>> GetById(int id)
    {
        var sponsor = await _sponsorService.GetByIdAsync(id);
        if (sponsor == null)
            return NotFound(new { message = $"No se encontró el patrocinador con ID {id}." });
        return Ok(_mapper.Map<SponsorResponseDTO>(sponsor));
    }

    [HttpPost]
    public async Task<ActionResult<SponsorResponseDTO>> Create(SponsorRequestDTO dto)
    {
        var sponsor = _mapper.Map<Sponsor>(dto);
        var created = await _sponsorService.CreateAsync(sponsor);
        var response = _mapper.Map<SponsorResponseDTO>(created);
        return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, SponsorRequestDTO dto)
    {
        var sponsor = _mapper.Map<Sponsor>(dto);
        await _sponsorService.UpdateAsync(id, sponsor);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _sponsorService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/tournaments")]
    public async Task<ActionResult<TournamentSponsorResponseDTO>> RegisterToTournament(
        int id, TournamentSponsorRequestDTO dto)
    {
        var link = await _sponsorService.RegisterSponsorToTournamentAsync(
                           id, dto.TournamentId, dto.ContractAmount);
        var response = _mapper.Map<TournamentSponsorResponseDTO>(link);
        return CreatedAtAction(nameof(GetTournaments), new { id }, response);
    }

    [HttpGet("{id}/tournaments")]
    public async Task<ActionResult<IEnumerable<TournamentSponsorResponseDTO>>> GetTournaments(int id)
    {
        var links = await _sponsorService.GetTournamentsBySponsorAsync(id);
        var response = _mapper.Map<IEnumerable<TournamentSponsorResponseDTO>>(links);
        return Ok(response);
    }

    [HttpDelete("{id}/tournaments/{tournamentId}")]
    public async Task<ActionResult> RemoveFromTournament(int id, int tournamentId)
    {
        await _sponsorService.RemoveSponsorFromTournamentAsync(id, tournamentId);
        return NoContent();
    }
}
