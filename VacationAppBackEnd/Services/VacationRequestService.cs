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

        public async Task<List<VacationRequest>> GetAllAsync() 
            => await _context.VacationRequests.ToListAsync();
        public async Task<VacationRequest?> GetByIdAsync(int id) 
            => await _context.VacationRequests.FirstOrDefaultAsync(v => v.Id == id);

        public async Task<VacationRequest> CreateAsync(VacationRequestDTO dto)
        {
            
            if (dto.StartDate > dto.EndDate)
                throw new ArgumentException("Start date cannot be after end date.");

            var newRequest = new VacationRequest
            {
                
                UserId = dto.UserId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Comment = dto.Comment,
                Status = Enums.VacationRequestStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            _context.VacationRequests.Add(newRequest);
            await _context.SaveChangesAsync();
            return newRequest;
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
