using VacationAppBackEnd.Enums;

namespace VacationAppBackEnd.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public UserRole Role { get; set; }
        public decimal RemainingVacationDays { get; set; }
        public int? SupervisorId { get; set; }
        public User? Supervisor { get; set; }
        public List<User> Subordinates { get; set; } = new();
        public DateOnly CreatedAt { get; set; }
    }
}
