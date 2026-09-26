namespace VacationAppBackEnd.DTOs
{
    public class RefreshTokenRequestDTO
    {
        public int Id { get; set; }
        public required string RefreshToken { get; set; } 
    }
}
