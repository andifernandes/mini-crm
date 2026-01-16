using MiniCRM.API.Entities;
using MiniCRM.API.Interfaces.Repositories;
using MiniCRM.API.Interfaces.Services;

namespace MiniCRM.API.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }
}
