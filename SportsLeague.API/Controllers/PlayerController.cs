using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayerController : ControllerBase
{
    private readonly IPlayerService _playerService;
    private readonly IMapper _mapper;

    public PlayerController(IPlayerService playerService, IMapper mapper)
    {
        _playerService = playerService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResultDTO<PlayerResponseDTO>>> GetAll(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var players = await _playerService.GetAllAsync(page, pageSize);
        var totalCount = await _playerService.GetCountAsync();
        var items = _mapper.Map<IEnumerable<PlayerResponseDTO>>(players);

        return Ok(new PagedResultDTO<PlayerResponseDTO>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PlayerResponseDTO>> GetById(int id)
    {
        var player = await _playerService.GetByIdAsync(id);
        if (player == null)
            return NotFound(new { message = $"Jugador con ID {id} no encontrado" });
        return Ok(_mapper.Map<PlayerResponseDTO>(player));
    }

    [HttpGet("team/{teamId}")]
    public async Task<ActionResult<IEnumerable<PlayerResponseDTO>>> GetByTeam(int teamId)
    {
        var players = await _playerService.GetByTeamAsync(teamId);
        return Ok(_mapper.Map<IEnumerable<PlayerResponseDTO>>(players));
    }

    [HttpPost]
    public async Task<ActionResult<PlayerResponseDTO>> Create(PlayerRequestDTO dto)
    {
        var player = _mapper.Map<Player>(dto);
        var createdPlayer = await _playerService.CreateAsync(player);
        var playerWithTeam = await _playerService.GetByIdAsync(createdPlayer.Id);
        var responseDto = _mapper.Map<PlayerResponseDTO>(playerWithTeam);
        return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, PlayerRequestDTO dto)
    {
        var player = _mapper.Map<Player>(dto);
        await _playerService.UpdateAsync(id, player);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _playerService.DeleteAsync(id);
        return NoContent();
    }
}
