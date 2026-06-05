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

        public List<VacationRequest> GetAll() => _context.VacationRequests.ToList();
        public VacationRequest? GetById(int id) => _context.VacationRequests.FirstOrDefault(v => v.Id == id);

        public VacationRequest Create(VacationRequestDTO dto)
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
            _context.SaveChanges();
            return newRequest;
        }

        public VacationRequest? Update(int id, UpdateVacationRequestDTO dto)
        {
            var existingRequest = GetById(id);

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

            _context.SaveChanges();
            return existingRequest;

        }

        public bool Delete(int id)
        {
            var existingRequest = GetById(id);

            if(existingRequest == null)
                return false;

            if(existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return false;
           
            _context.VacationRequests.Remove(existingRequest);
            _context.SaveChanges();
            return true;
        }

        public VacationRequest? Approve(int id)
        {
            var existingRequest = GetById(id);
            if(existingRequest==null || existingRequest.Status != Enums.VacationRequestStatus.Pending)
            {
                return null;
            }

            existingRequest.Status = Enums.VacationRequestStatus.Approved;
            existingRequest.DecisionDate = DateTime.UtcNow;
            existingRequest.ReviewedById = 1; // Simulate admin user ID

            _context.SaveChanges();
            return existingRequest;

        }
        public VacationRequest? Reject(int id)
        {
            var existingRequest = GetById(id);
            if (existingRequest == null || existingRequest.Status != Enums.VacationRequestStatus.Pending)
            {
                return null;
            }

            existingRequest.Status = Enums.VacationRequestStatus.Rejected;
            existingRequest.DecisionDate = DateTime.UtcNow;
            existingRequest.ReviewedById = 1; // Simulate admin user ID


            _context.SaveChanges();
            return existingRequest;

        }

    }
}
