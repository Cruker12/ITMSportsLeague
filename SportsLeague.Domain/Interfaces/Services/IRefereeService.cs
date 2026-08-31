using SportsLeague.Domain.Entities;

namespace SportsLeague.Domain.Interfaces.Services;

public interface IRefereeService
{
    Task<IEnumerable<Referee>> GetAllAsync(int? page = null, int? pageSize = null);
    Task<int> GetCountAsync();
    Task<Referee?> GetByIdAsync(int id);
    Task<Referee> CreateAsync(Referee referee);
    Task UpdateAsync(int id, Referee referee);
    Task DeleteAsync(int id);
}
