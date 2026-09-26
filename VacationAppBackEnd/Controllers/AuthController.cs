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
        public async Task<ActionResult<User>> Login(LoginUserDTO request)
        {
            var token = await _service.LoginAsync(request);
            if (token is null) {
                return BadRequest("Email or Password is incorrect!");
            }

            return Ok(token);
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
    }
}
