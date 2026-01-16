using MiniCRM.API.Controllers;
using MiniCRM.API.Entities;
using MiniCRM.API.Interfaces.Services;
using MiniCRM.API.DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

public class UsersControllerTests
{
    [Fact]
    public async Task GetUserProfile_ReturnsUserProfile_WhenUserExists()
    {
        // Arrange
        var mockUserService = new Mock<IUserService>();
        var userId = 1;
        var user = new User("John Doe", "john@example.com", "minhaSenha123") { Id = userId };

        mockUserService.Setup(s => s.GetByIdAsync(userId)).ReturnsAsync(user);

        var controller = new UsersController();

        // Mock do User.Claims para simular o usuário autenticado
        var userClaims = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString())
        }, "mock"));

        controller.ControllerContext = new ControllerContext()
        {
            HttpContext = new DefaultHttpContext() { User = userClaims }
        };

        // Act
        var result = await controller.GetUserProfile(mockUserService.Object);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var profile = Assert.IsType<UserProfileResponse>(okResult.Value);

        Assert.Equal(user.Name, profile.Name);
        Assert.Equal(user.Email, profile.Email);
    }
}
