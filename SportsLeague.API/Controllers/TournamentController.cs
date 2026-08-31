using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TournamentController : ControllerBase
{
    private readonly ITournamentService _tournamentService;
    private readonly IMapper _mapper;

    public TournamentController(ITournamentService tournamentService, IMapper mapper)
    {
        _tournamentService = tournamentService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResultDTO<TournamentResponseDTO>>> GetAll(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var tournaments = await _tournamentService.GetAllAsync(page, pageSize);
        var totalCount = await _tournamentService.GetCountAsync();
        var items = _mapper.Map<IEnumerable<TournamentResponseDTO>>(tournaments);

        return Ok(new PagedResultDTO<TournamentResponseDTO>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TournamentResponseDTO>> GetById(int id)
    {
        var tournament = await _tournamentService.GetByIdAsync(id);
        if (tournament == null)
            return NotFound(new { message = $"Torneo con ID {id} no encontrado" });
        return Ok(_mapper.Map<TournamentResponseDTO>(tournament));
    }

    [HttpPost]
    public async Task<ActionResult<TournamentResponseDTO>> Create(TournamentRequestDTO dto)
    {
        var tournament = _mapper.Map<Tournament>(dto);
        var created = await _tournamentService.CreateAsync(tournament);
        var responseDto = _mapper.Map<TournamentResponseDTO>(created);
        return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, TournamentRequestDTO dto)
    {
        var tournament = _mapper.Map<Tournament>(dto);
        await _tournamentService.UpdateAsync(id, tournament);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _tournamentService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<ActionResult> UpdateStatus(int id, UpdateStatusDTO dto)
    {
        await _tournamentService.UpdateStatusAsync(id, dto.Status);
        return NoContent();
    }

    [HttpPost("{id}/teams")]
    public async Task<ActionResult> RegisterTeam(int id, RegisterTeamDTO dto)
    {
        await _tournamentService.RegisterTeamAsync(id, dto.TeamId);
        return Ok(new { message = "Equipo inscrito exitosamente" });
    }

    [HttpGet("{id}/teams")]
    public async Task<ActionResult<IEnumerable<TeamResponseDTO>>> GetTeams(int id)
    {
        var teams = await _tournamentService.GetTeamsByTournamentAsync(id);
        return Ok(_mapper.Map<IEnumerable<TeamResponseDTO>>(teams));
    }
}
