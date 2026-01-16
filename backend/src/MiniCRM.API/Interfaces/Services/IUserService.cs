using MiniCRM.API.Entities;

namespace MiniCRM.API.Interfaces.Services;

public interface IUserService
{
    Task<User?> GetByIdAsync(int id);

    Task<List<User>> GetAllAsync(); 
}