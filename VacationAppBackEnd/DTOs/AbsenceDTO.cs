using VacationAppBackEnd.Enums;

namespace VacationAppBackEnd.DTOs
{
    public class AbsenceDTO
    {
        public int Id { get; set; }
        public string Initials { get; set; }
        public string FullName { get; set; }
        public UserRole Role { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DateOnly NextWorkingDay { get; set; }
        public VacationType Type { get; set; }
    }
}
