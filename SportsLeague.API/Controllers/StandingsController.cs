using Microsoft.AspNetCore.Mvc;
using SportsLeague.Domain.DTOs;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.API.Controllers;

[ApiController]
[Route("api")]
public class StandingsController : ControllerBase
{
    private readonly IStandingsService _standingsService;

    public StandingsController(IStandingsService standingsService)
    {
        _standingsService = standingsService;
    }

    [HttpGet("standings")]
    public async Task<ActionResult<List<StandingDTO>>> GetStandings([FromQuery] int tournamentId)
    {
        var standings = await _standingsService.GetStandingsAsync(tournamentId);
        return Ok(standings);
    }

    [HttpGet("stats/scorers")]
    public async Task<ActionResult<List<TopScorerDTO>>> GetTopScorers([FromQuery] int tournamentId)
    {
        var scorers = await _standingsService.GetTopScorersAsync(tournamentId);
        return Ok(scorers);
    }

    [HttpGet("stats/cards")]
    public async Task<ActionResult<List<CardStatsDTO>>> GetCardStats([FromQuery] int tournamentId)
    {
        var cards = await _standingsService.GetCardStatsAsync(tournamentId);
        return Ok(cards);
    }
}
