using SportsLeague.Domain.Entities;

namespace SportsLeague.Domain.Interfaces.Repositories;

public interface IGenericRepository<T> where T : AuditBase
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> GetAllPagedAsync(int page, int pageSize);
    Task<int> GetCountAsync();
    Task<T?> GetByIdAsync(int id);
    Task<T> CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
