using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RefereeController : ControllerBase
{
    private readonly IRefereeService _refereeService;
    private readonly IMapper _mapper;

    public RefereeController(IRefereeService refereeService, IMapper mapper)
    {
        _refereeService = refereeService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResultDTO<RefereeResponseDTO>>> GetAll(
        [FromQuery] PaginationParams pagination)
    {
        var referees = await _refereeService.GetAllAsync(pagination.Page, pagination.PageSize);
        var totalCount = await _refereeService.GetCountAsync();
        var items = _mapper.Map<IEnumerable<RefereeResponseDTO>>(referees);

        return Ok(new PagedResultDTO<RefereeResponseDTO>
        {
            Items = items,
            TotalCount = totalCount,
            Page = pagination.Page,
            PageSize = pagination.PageSize
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RefereeResponseDTO>> GetById(int id)
    {
        var referee = await _refereeService.GetByIdAsync(id);
        if (referee == null)
            return NotFound(new { message = $"Arbitro con ID {id} no encontrado" });
        return Ok(_mapper.Map<RefereeResponseDTO>(referee));
    }

    [HttpPost]
    public async Task<ActionResult<RefereeResponseDTO>> Create(RefereeRequestDTO dto)
    {
        var referee = _mapper.Map<Referee>(dto);
        var created = await _refereeService.CreateAsync(referee);
        var responseDto = _mapper.Map<RefereeResponseDTO>(created);
        return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, RefereeRequestDTO dto)
    {
        var referee = _mapper.Map<Referee>(dto);
        await _refereeService.UpdateAsync(id, referee);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _refereeService.DeleteAsync(id);
        return NoContent();
    }
}
