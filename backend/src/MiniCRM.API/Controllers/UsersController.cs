using MiniCRM.API.DTOs.Responses;
using MiniCRM.API.Entities;
using MiniCRM.API.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MiniCRM.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserProfileResponse>> GetUserProfile(IUserService userService)
    {
        if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out int userId))
        {
            return Unauthorized("User ID not found in claims.");
        }

        User? user = await userService.GetByIdAsync(userId);

        if (user is null)
        {
            return NotFound("User not found.");
        }

        UserProfileResponse response = new(user.Name, user.Email);
        return Ok(response);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserProfileResponse>>> GetAllUsers(IUserService userService)
    {
        var users = await userService.GetAllAsync();

        var response = users.Select(u => new UserProfileResponse(u.Name, u.Email)).ToList();

        return Ok(response);
    }

}