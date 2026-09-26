using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using VacationAppBackEnd.Data;
using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        public async Task<User?> RegisterAsync(RegisterUserDTO request)
        {

            var email = request.Email.Trim().ToLower();

            
            if(await _context.Users.AnyAsync(u => u.Email == email))
            {
                return null;
            }

            var user = new User();

            var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);
            
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = email;
            user.PasswordHash = hashedPassword;
            user.Role = Enums.UserRole.Employee; // can be changed later

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;

        }


        public async Task<TokenResponseDTO?> LoginAsync(LoginUserDTO request)
        {
            var email = request.Email.Trim().ToLower();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return null;
            if(new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var response = new TokenResponseDTO() 
            {
                AccessToken= CreateToken(user),
                RefreshToken= await GenerateAndSaveRefreshTokenAsync(user),
            };

            return response;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new Byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();
            return refreshToken;
        }

        private string CreateToken(User user)
        {
          var claims = new List<Claim>()
          {
              new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
              new Claim(ClaimTypes.Email, user.Email),
              new Claim(ClaimTypes.Role, user.Role.ToString())
          };

            var secret = _configuration.GetValue<string>("AppSettings:Token");
            var issuer = _configuration.GetValue<string>("AppSettings:Issuer");
            var audience = _configuration.GetValue<string>("AppSettings:Audience");

            if (string.IsNullOrEmpty(secret)){
                throw new InvalidOperationException("JWT is not configured");
            }
            if (string.IsNullOrEmpty(issuer)) 
            {
                throw new InvalidOperationException("JWT Issuer is not configured");
            }
            if (string.IsNullOrEmpty(audience))
            {
                throw new InvalidOperationException("JWT Audience is not configured");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

       
    }
}
