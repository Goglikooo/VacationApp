using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Services
{
    public class VacationRequestService: IVacationRequestService
    {
        private static List<VacationRequest> vacationrequests = new List<VacationRequest>();

        public List<VacationRequest> GetAll() => vacationrequests;

        public VacationRequest? GetById(int id) => vacationrequests.FirstOrDefault(v => v.Id == id);

        public VacationRequest Create(VacationRequestDTO dto)
        {
            
            if (dto.StartDate > dto.EndDate)
                throw new ArgumentException("Start date cannot be after end date.");

            var newRequest = new VacationRequest
            {
                Id = vacationrequests.Count != 0 ? vacationrequests.Max(x => x.Id) + 1 : 1,
                UserId = dto.UserId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Comment = dto.Comment,
                Status = Enums.VacationRequestStatus.Pending,
                CreatedAt = DateTime.Now
            };

            vacationrequests.Add(newRequest);
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

            return existingRequest;

        }

        public bool Delete(int id)
        {
            var existingRequest = GetById(id);

            if(existingRequest == null)
                return false;

            if(existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return false;
           
            vacationrequests.Remove(existingRequest);
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
            existingRequest.DecisionDate = DateTime.Now;
            existingRequest.ReviewedById = 1; // Simulate admin user ID
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
            existingRequest.DecisionDate = DateTime.Now;
            existingRequest.ReviewedById = 1; // Simulate admin user ID
            return existingRequest;

        }

    }
}
