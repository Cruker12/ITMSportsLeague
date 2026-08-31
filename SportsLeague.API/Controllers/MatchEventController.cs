using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api/match/{matchId}")]
public class MatchEventController : ControllerBase
{
    private readonly IMatchEventService _matchEventService;
    private readonly IMapper _mapper;

    public MatchEventController(
        IMatchEventService matchEventService, IMapper mapper)
    {
        _matchEventService = matchEventService;
        _mapper = mapper;
    }

    // ═══ Result ═══

    [HttpPost("result")]
    public async Task<ActionResult<MatchResultResponseDTO>> RegisterResult(
        int matchId, MatchResultRequestDTO dto)
    {
        var result = _mapper.Map<MatchResult>(dto);
        var created = await _matchEventService.RegisterResultAsync(matchId, result);
        return Ok(_mapper.Map<MatchResultResponseDTO>(created));
    }

    [HttpGet("result")]
    public async Task<ActionResult<MatchResultResponseDTO>> GetResult(int matchId)
    {
        var result = await _matchEventService.GetResultByMatchAsync(matchId);
        if (result == null)
            return NotFound(new { message = "Este partido aún no tiene resultado" });
        return Ok(_mapper.Map<MatchResultResponseDTO>(result));
    }

    // ═══ Goals ═══

    [HttpPost("goals")]
    public async Task<ActionResult<GoalResponseDTO>> RegisterGoal(
        int matchId, GoalRequestDTO dto)
    {
        var goal = _mapper.Map<Goal>(dto);
        var created = await _matchEventService.RegisterGoalAsync(matchId, goal);
        var goals = await _matchEventService.GetGoalsByMatchAsync(matchId);
        var createdGoal = goals.FirstOrDefault(g => g.Id == created.Id);
        return Ok(_mapper.Map<GoalResponseDTO>(createdGoal));
    }

    [HttpGet("goals")]
    public async Task<ActionResult<IEnumerable<GoalResponseDTO>>> GetGoals(int matchId)
    {
        var goals = await _matchEventService.GetGoalsByMatchAsync(matchId);
        return Ok(_mapper.Map<IEnumerable<GoalResponseDTO>>(goals));
    }

    [HttpDelete("goals/{goalId}")]
    public async Task<ActionResult> DeleteGoal(int matchId, int goalId)
    {
        await _matchEventService.DeleteGoalAsync(goalId);
        return NoContent();
    }

    // ═══ Cards ═══

    [HttpPost("cards")]
    public async Task<ActionResult<CardResponseDTO>> RegisterCard(
        int matchId, CardRequestDTO dto)
    {
        var card = _mapper.Map<Card>(dto);
        var created = await _matchEventService.RegisterCardAsync(matchId, card);
        var cards = await _matchEventService.GetCardsByMatchAsync(matchId);
        var createdCard = cards.FirstOrDefault(c => c.Id == created.Id);
        return Ok(_mapper.Map<CardResponseDTO>(createdCard));
    }

    [HttpGet("cards")]
    public async Task<ActionResult<IEnumerable<CardResponseDTO>>> GetCards(int matchId)
    {
        var cards = await _matchEventService.GetCardsByMatchAsync(matchId);
        return Ok(_mapper.Map<IEnumerable<CardResponseDTO>>(cards));
    }

    [HttpDelete("cards/{cardId}")]
    public async Task<ActionResult> DeleteCard(int matchId, int cardId)
    {
        await _matchEventService.DeleteCardAsync(cardId);
        return NoContent();
    }
}
