using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchController : ControllerBase
{
    private readonly IMatchService _matchService;
    private readonly IMapper _mapper;

    public MatchController(IMatchService matchService, IMapper mapper)
    {
        _matchService = matchService;
        _mapper = mapper;
    }

    [HttpGet("tournament/{tournamentId}")]
    public async Task<ActionResult<PagedResultDTO<MatchResponseDTO>>> GetByTournament(
        int tournamentId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var matches = await _matchService.GetAllByTournamentAsync(tournamentId, page, pageSize);
        var totalCount = await _matchService.GetCountByTournamentAsync(tournamentId);
        var items = _mapper.Map<IEnumerable<MatchResponseDTO>>(matches);

        return Ok(new PagedResultDTO<MatchResponseDTO>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MatchResponseDTO>> GetById(int id)
    {
        var match = await _matchService.GetByIdAsync(id);
        if (match == null)
            return NotFound(new { message = $"Partido con ID {id} no encontrado" });
        return Ok(_mapper.Map<MatchResponseDTO>(match));
    }

    [HttpPost]
    public async Task<ActionResult<MatchResponseDTO>> Create(MatchRequestDTO dto)
    {
        var match = _mapper.Map<Match>(dto);
        var created = await _matchService.CreateAsync(match);
        var matchWithDetails = await _matchService.GetByIdAsync(created.Id);
        var responseDto = _mapper.Map<MatchResponseDTO>(matchWithDetails);
        return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, MatchRequestDTO dto)
    {
        var match = _mapper.Map<Match>(dto);
        await _matchService.UpdateAsync(id, match);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _matchService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<ActionResult> UpdateStatus(int id, UpdateMatchStatusDTO dto)
    {
        await _matchService.UpdateStatusAsync(id, dto.Status);
        return NoContent();
    }
}
