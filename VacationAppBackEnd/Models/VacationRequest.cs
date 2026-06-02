using VacationAppBackEnd.Enums;

namespace VacationAppBackEnd.Models
{
    public class VacationRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User RequestedBy { get; set; } = null!;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public VacationRequestStatus Status { get; set; }
        public string? Comment { get; set; } 
        public DateTime CreatedAt { get; set; }
        public int? ReviewedById { get; set; }
        public User? ReviewedBy { get; set; }
        public DateTime? DecisionDate { get; set; }
    }
}
