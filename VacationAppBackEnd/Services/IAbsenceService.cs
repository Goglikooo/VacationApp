using VacationAppBackEnd.DTOs;

namespace VacationAppBackEnd.Services
{
    public interface IAbsenceService
    {
        Task<List<AbsenceDTO>> GetAbsenceListAsync(DateOnly date);
    }
}
