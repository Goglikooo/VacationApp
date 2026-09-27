using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;
using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;
using VacationAppBackEnd.Services;

namespace VacationAppBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterUserDTO request)
        {
            var user = await _service.RegisterAsync(request);
            if (user is null) {
                return BadRequest("Email Already Exists");
            }

            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseWithoutRefreshDTO>> Login(LoginUserDTO request)
        {
            var result = await _service.LoginAsync(request);
            if (result is null) {
                return BadRequest("Email or Password is incorrect!");
            }

            Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, //change to true -  when Production
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(1)
            });

            var response = new TokenResponseWithoutRefreshDTO { AccessToken = result.AccessToken };

            return Ok(response);
        }

        [Authorize]
        [HttpGet]
        public IActionResult TestAuthorize() 
        {
            return Ok("Welcome You Are Authenticated!");
        }

        [Authorize(Roles = "Supervisor")]
        [HttpGet("Admin")]
        public IActionResult TestAdminAccess() 
        {
            return Ok("You are Admin!!!");
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseWithoutRefreshDTO>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken)) 
            {
                return Unauthorized("Refresh token is missing!");
            }

            var result = await _service.RefreshTokensAsync(refreshToken);
            if (result is null ) {
                return Unauthorized("Invalid Refresh token!");
            }

            Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, //change to true -  when Production
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(1)
            });

            return Ok(new TokenResponseWithoutRefreshDTO
            {
                AccessToken = result.AccessToken
            });
        }
    }
}
