namespace VacationAppBackEnd.DTOs
{
    public class UpdateVacationRequestDTO
    {
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string? Comment { get; set; }
    }
}
