using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Services
{
    public interface IVacationRequestService
    {
        List<VacationRequest> GetAll();
        VacationRequest? GetById(int id);
        VacationRequest Create(VacationRequestDTO dto);
        VacationRequest? Update(int id, UpdateVacationRequestDTO dto);
        bool Delete(int id);
        VacationRequest? Approve(int id);
        VacationRequest? Reject(int id);

    }
}
