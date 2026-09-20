using VacationAppBackEnd.Enums;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.DTOs
{
    public class VacationRequestResponseDTO
    {
        public int Id { get; set; }
        public UserResponseDTO RequestedBy { get; set; } = null!;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public VacationType Type { get; set; }
        public VacationRequestStatus Status { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserResponseDTO? ReviewedBy { get; set; }
        public DateTime? DecisionDate { get; set; }
    }
}
