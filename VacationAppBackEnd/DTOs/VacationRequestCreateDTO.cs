namespace VacationAppBackEnd.DTOs
{
    public class VacationRequestCreateDTO
    {
        public int UserId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string? Comment { get; set; }

    }
}
