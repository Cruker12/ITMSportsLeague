using Microsoft.Extensions.Logging;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Repositories;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.Domain.Services;

public class TeamService : ITeamService
{
    private readonly ITeamRepository _teamRepository;
    private readonly ILogger<TeamService> _logger;

    public TeamService(ITeamRepository teamRepository, ILogger<TeamService> logger)
    {
        _teamRepository = teamRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<Team>> GetAllAsync(int? page = null, int? pageSize = null)
    {
        _logger.LogInformation("Retrieving teams (page: {Page}, size: {PageSize})", page, pageSize);
        if (page.HasValue && pageSize.HasValue)
            return await _teamRepository.GetAllPagedAsync(page.Value, pageSize.Value);
        return await _teamRepository.GetAllAsync();
    }

    public async Task<int> GetCountAsync()
    {
        return await _teamRepository.GetCountAsync();
    }

    public async Task<Team?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Retrieving team with ID: {TeamId}", id);
        var team = await _teamRepository.GetByIdAsync(id);
        if (team == null)
            _logger.LogWarning("Team with ID {TeamId} not found", id);
        return team;
    }

    public async Task<Team> CreateAsync(Team team)
    {
        var existingTeam = await _teamRepository.GetByNameAsync(team.Name);
        if (existingTeam != null)
        {
            _logger.LogWarning("Team with name '{TeamName}' already exists", team.Name);
            throw new InvalidOperationException(
                $"Ya existe un equipo con el nombre '{team.Name}'");
        }

        _logger.LogInformation("Creating team: {TeamName}", team.Name);
        return await _teamRepository.CreateAsync(team);
    }

    public async Task UpdateAsync(int id, Team team)
    {
        var existingTeam = await _teamRepository.GetByIdAsync(id);
        if (existingTeam == null)
            throw new KeyNotFoundException($"No se encontró el equipo con ID {id}");

        if (existingTeam.Name != team.Name)
        {
            var teamWithSameName = await _teamRepository.GetByNameAsync(team.Name);
            if (teamWithSameName != null)
                throw new InvalidOperationException(
                    $"Ya existe un equipo con el nombre '{team.Name}'");
        }

        existingTeam.Name = team.Name;
        existingTeam.City = team.City;
        existingTeam.Stadium = team.Stadium;
        existingTeam.LogoUrl = team.LogoUrl;
        existingTeam.FoundedDate = team.FoundedDate;

        _logger.LogInformation("Updating team with ID: {TeamId}", id);
        await _teamRepository.UpdateAsync(existingTeam);
    }

    public async Task DeleteAsync(int id)
    {
        var exists = await _teamRepository.ExistsAsync(id);
        if (!exists)
            throw new KeyNotFoundException($"No se encontró el equipo con ID {id}");

        _logger.LogInformation("Deleting team with ID: {TeamId}", id);
        await _teamRepository.DeleteAsync(id);
    }
}
