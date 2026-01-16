using MiniCRM.API.DTOs.Requests;
using MiniCRM.API.Models;

namespace MiniCRM.API.Interfaces.Services;

public interface IAuthService
{
    Task<AuthResult> LoginAsync(LoginRequest request);
    Task<AuthResult> RegisterAsync(RegisterRequest request);
    Task<AuthResult> RefreshTokenAsync(string refreshToken);
}