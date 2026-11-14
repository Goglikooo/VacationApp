namespace VacationAppBackEnd.DTOs
{
    public class TokenResponseDTO
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
        public required string UserEmail { get; set; }
        public required string UserName { get; set; }
        public required string UserRole { get; set; }
    }
}
