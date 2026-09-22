using Microsoft.EntityFrameworkCore;
using VacationAppBackEnd.Data;
using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Services
{
    public class VacationRequestService: IVacationRequestService
    {

        private readonly AppDbContext _context;

        public VacationRequestService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<VacationRequest>> GetAllAsync() =>
            await _context.VacationRequests.ToListAsync();

        public async Task<VacationRequest?> GetByIdAsync(int id) =>
            await _context.VacationRequests.FirstOrDefaultAsync(item => item.Id == id);

        public async Task<List<VacationRequestResponseDTO>> GetPendingVacationsAsync() =>         
            await _context.VacationRequests
                 .Where(v => v.Status == Enums.VacationRequestStatus.Pending)
                 .Select(v => new VacationRequestResponseDTO
                 {
                     Id = v.Id,
                     StartDate = v.StartDate,
                     EndDate = v.EndDate,
                     Type = v.Type,
                     Status = v.Status,
                     Comment = v.Comment,
                     CreatedAt = v.CreatedAt,
                     RequestedBy = new UserResponseDTO
                     {
                         Id = v.RequestedBy.Id,
                         FullName = v.RequestedBy.FirstName + " " + v.RequestedBy.LastName,
                         Email = v.RequestedBy.Email
                     }
                 })
                 .ToListAsync();
        

        public async Task<VacationRequestResponseDTO> CreateAsync(VacationRequestCreateDTO dto)
        {
            
            if (dto.StartDate > dto.EndDate)
                throw new ArgumentException("Start date cannot be after end date.");

            var user = await _context.Users.FindAsync(dto.UserId);

            if (user == null) throw new Exception("User not found.");

            var newRequest = new VacationRequest
            {

                UserId = dto.UserId,
                RequestedBy = user,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                NextWorkingDay = CalculateNextWorkingDay(dto.EndDate),
                Type = dto.Type,
                Comment = dto.Comment,
                Status = Enums.VacationRequestStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            _context.VacationRequests.Add(newRequest);
            await _context.SaveChangesAsync();

            var newRequestResponse = new VacationRequestResponseDTO
            {
                Id = newRequest.Id,
                RequestedBy = new UserResponseDTO
                {
                    Id = newRequest.RequestedBy.Id,
                    FullName = newRequest.RequestedBy.FirstName + newRequest.RequestedBy.LastName,
                    Email = newRequest.RequestedBy.Email,
                },
                StartDate = newRequest.StartDate,
                EndDate = newRequest.EndDate,
                NextWorkingDay = CalculateNextWorkingDay(newRequest.EndDate),
                Type = newRequest.Type,
                Status = newRequest.Status,
                Comment = newRequest.Comment,
                CreatedAt = newRequest.CreatedAt,
            };

            return newRequestResponse;
        }

        private static DateOnly CalculateNextWorkingDay(DateOnly date)
        {
            var nextDay = date.AddDays(1);

            switch (nextDay.DayOfWeek)
            {
                case DayOfWeek.Sunday:
                    return nextDay.AddDays(1);
                case DayOfWeek.Saturday:
                    return nextDay.AddDays(2);
                default:
                    return nextDay;
            }
        }
        public async Task<VacationRequest?> UpdateAsync(int id, UpdateVacationRequestDTO dto)
        {
            var existingRequest = await GetByIdAsync(id);

            if (existingRequest == null)
                return null;

            if(existingRequest.Status != Enums.VacationRequestStatus.Pending) 
                return null;

            if(dto.StartDate > dto.EndDate) 
                return null;

            existingRequest.StartDate = dto.StartDate;
            existingRequest.EndDate = dto.EndDate;
            
            if(!string.IsNullOrWhiteSpace(dto.Comment))
                existingRequest.Comment = dto.Comment;

            await _context.SaveChangesAsync();
            return existingRequest;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existingRequest = await GetByIdAsync(id);

            if(existingRequest == null)
                return false;

            if(existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return false;
           
            _context.VacationRequests.Remove(existingRequest);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<VacationRequest?> ApproveAsync(int id)
        {
            var existingRequest = await GetByIdAsync(id);
            if(existingRequest==null || existingRequest.Status != Enums.VacationRequestStatus.Pending)
            {
                return null;
            }

            existingRequest.Status = Enums.VacationRequestStatus.Approved;
            existingRequest.DecisionDate = DateTime.UtcNow;
            existingRequest.ReviewedById = 1; // Simulate admin user ID

            await _context.SaveChangesAsync();
            return existingRequest;

        }
        public async Task<VacationRequest?> RejectAsync(int id)
        {
            var existingRequest = await GetByIdAsync(id);
            if (existingRequest == null || existingRequest.Status != Enums.VacationRequestStatus.Pending)
            {
                return null;
            }

            existingRequest.Status = Enums.VacationRequestStatus.Rejected;
            existingRequest.DecisionDate = DateTime.UtcNow;
            existingRequest.ReviewedById = 1; // Simulate admin user ID


            await _context.SaveChangesAsync();
            return existingRequest;

        }

    }
}
