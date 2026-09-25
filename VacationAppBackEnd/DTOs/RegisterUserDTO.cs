using System.ComponentModel.DataAnnotations;
using VacationAppBackEnd.Enums;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.DTOs
{
    public class RegisterUserDTO
    {
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;

    }
}
