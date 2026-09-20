using Microsoft.EntityFrameworkCore;
using VacationAppBackEnd.Data;
using VacationAppBackEnd.DTOs;

namespace VacationAppBackEnd.Services
{
    public class AbsenceService : IAbsenceService
    {
        private readonly AppDbContext _context;

        public AbsenceService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<AbsenceDTO>> GetAbsenceListAsync(DateOnly date) => 
            await _context.VacationRequests
            .Where(v => v.StartDate <= date && v.EndDate >= date && v.Status == Enums.VacationRequestStatus.Approved)
            .Select(v => new AbsenceDTO
            {
                Id = v.Id,
                Initials = v.RequestedBy.FirstName[0] +""+ v.RequestedBy.LastName[0],
                FullName = v.RequestedBy.FirstName + " " + v.RequestedBy.LastName,
                Role = v.RequestedBy.Role,
                StartDate = v.StartDate,
                EndDate = v.EndDate,
                Type = v.Type

    })
            .ToListAsync();
    }
}
