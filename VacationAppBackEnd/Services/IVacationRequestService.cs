using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Services
{
    public interface IVacationRequestService
    {
        Task<List<VacationRequest>> GetAllAsync();
        Task<VacationRequest?> GetByIdAsync(int id);
        Task<VacationRequest> CreateAsync(VacationRequestDTO dto);
        Task<VacationRequest?> UpdateAsync(int id, UpdateVacationRequestDTO dto);
        Task<bool> DeleteAsync(int id);
        Task<VacationRequest?> ApproveAsync(int id);
        Task<VacationRequest?> RejectAsync(int id);

    }
}
