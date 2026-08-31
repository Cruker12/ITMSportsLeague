using Microsoft.Extensions.Logging;
using SportsLeague.Domain.Entities;
using SportsLeague.Domain.Interfaces.Repositories;
using SportsLeague.Domain.Interfaces.Services;

namespace SportsLeague.Domain.Services;

public class PlayerService : IPlayerService
{
    private readonly IPlayerRepository _playerRepository;
    private readonly ITeamRepository _teamRepository;
    private readonly ILogger<PlayerService> _logger;

    public PlayerService(
        IPlayerRepository playerRepository,
        ITeamRepository teamRepository,
        ILogger<PlayerService> logger)
    {
        _playerRepository = playerRepository;
        _teamRepository = teamRepository;
        _logger = logger;
    }

    public async Task<IEnumerable<Player>> GetAllAsync(int? page = null, int? pageSize = null)
    {
        _logger.LogInformation("Retrieving players (page: {Page}, size: {PageSize})", page, pageSize);
        if (page.HasValue && pageSize.HasValue)
        {
            var paged = await _playerRepository.GetAllPagedAsync(page.Value, pageSize.Value);
            return paged;
        }
        return await _playerRepository.GetAllWithTeamAsync();
    }

    public async Task<int> GetCountAsync()
    {
        return await _playerRepository.GetCountAsync();
    }

    public async Task<Player?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Retrieving player with ID: {PlayerId}", id);
        var player = await _playerRepository.GetByIdWithTeamAsync(id);
        if (player == null)
            _logger.LogWarning("Player with ID {PlayerId} not found", id);
        return player;
    }

    public async Task<IEnumerable<Player>> GetByTeamAsync(int teamId)
    {
        var teamExists = await _teamRepository.ExistsAsync(teamId);
        if (!teamExists)
            throw new KeyNotFoundException($"No se encontró el equipo con ID {teamId}");

        _logger.LogInformation("Retrieving players for team ID: {TeamId}", teamId);
        return await _playerRepository.GetByTeamAsync(teamId);
    }

    public async Task<Player> CreateAsync(Player player)
    {
        var teamExists = await _teamRepository.ExistsAsync(player.TeamId);
        if (!teamExists)
            throw new KeyNotFoundException($"No se encontró el equipo con ID {player.TeamId}");

        var existingPlayer = await _playerRepository
            .GetByTeamAndNumberAsync(player.TeamId, player.Number);
        if (existingPlayer != null)
            throw new InvalidOperationException(
                $"El número {player.Number} ya está en uso en este equipo");

        _logger.LogInformation(
            "Creating player: {FirstName} {LastName}",
            player.FirstName, player.LastName);
        return await _playerRepository.CreateAsync(player);
    }

    public async Task UpdateAsync(int id, Player player)
    {
        var existingPlayer = await _playerRepository.GetByIdAsync(id);
        if (existingPlayer == null)
            throw new KeyNotFoundException($"No se encontró el jugador con ID {id}");

        var teamExists = await _teamRepository.ExistsAsync(player.TeamId);
        if (!teamExists)
            throw new KeyNotFoundException($"No se encontró el equipo con ID {player.TeamId}");

        if (existingPlayer.Number != player.Number || existingPlayer.TeamId != player.TeamId)
        {
            var conflict = await _playerRepository
                .GetByTeamAndNumberAsync(player.TeamId, player.Number);
            if (conflict != null && conflict.Id != id)
                throw new InvalidOperationException(
                    $"El número {player.Number} ya está en uso en este equipo");
        }

        existingPlayer.FirstName = player.FirstName;
        existingPlayer.LastName = player.LastName;
        existingPlayer.BirthDate = player.BirthDate;
        existingPlayer.Number = player.Number;
        existingPlayer.Position = player.Position;
        existingPlayer.TeamId = player.TeamId;

        _logger.LogInformation("Updating player with ID: {PlayerId}", id);
        await _playerRepository.UpdateAsync(existingPlayer);
    }

    public async Task DeleteAsync(int id)
    {
        var exists = await _playerRepository.ExistsAsync(id);
        if (!exists)
            throw new KeyNotFoundException($"No se encontró el jugador con ID {id}");

        _logger.LogInformation("Deleting player with ID: {PlayerId}", id);
        await _playerRepository.DeleteAsync(id);
    }
}
