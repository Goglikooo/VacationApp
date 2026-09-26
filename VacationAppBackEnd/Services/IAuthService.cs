using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterUserDTO request);
        Task<TokenResponseDTO?> LoginAsync(LoginUserDTO request);
    }
}
