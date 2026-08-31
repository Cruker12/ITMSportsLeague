using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly ITeamService _teamService;
    private readonly IMapper _mapper;

    public TeamController(ITeamService teamService, IMapper mapper)
    {
        _teamService = teamService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResultDTO<TeamResponseDTO>>> GetAll(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var teams = await _teamService.GetAllAsync(page, pageSize);
        var totalCount = await _teamService.GetCountAsync();
        var items = _mapper.Map<IEnumerable<TeamResponseDTO>>(teams);

        return Ok(new PagedResultDTO<TeamResponseDTO>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TeamResponseDTO>> GetById(int id)
    {
        var team = await _teamService.GetByIdAsync(id);
        if (team == null)
            return NotFound(new { message = $"Equipo con ID {id} no encontrado" });
        return Ok(_mapper.Map<TeamResponseDTO>(team));
    }

    [HttpPost]
    public async Task<ActionResult<TeamResponseDTO>> Create(TeamRequestDTO dto)
    {
        var team = _mapper.Map<Team>(dto);
        var createdTeam = await _teamService.CreateAsync(team);
        var responseDto = _mapper.Map<TeamResponseDTO>(createdTeam);
        return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, TeamRequestDTO dto)
    {
        var team = _mapper.Map<Team>(dto);
        await _teamService.UpdateAsync(id, team);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _teamService.DeleteAsync(id);
        return NoContent();
    }
}
