using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VacationRequestsController : ControllerBase
    {

        static List<VacationRequest> vacationrequests = new List<VacationRequest>
        {
            new VacationRequest() {

                Id = 1,
                    UserId = 1,
                    RequestedBy = new User {
                        Id = 1,
                        FirstName = "pirveli",
                        LastName = "pirvelishvili",
                        Email = "pirvelii@gmail.com",
                        PasswordHash = "hashedpassword",
                        Role = Enums.UserRole.Employee,
                        RemainingVacationDays = 15,
                        CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                    },
                    StartDate = DateOnly.FromDateTime(DateTime.Now.AddDays(10)),
                    EndDate = DateOnly.FromDateTime(DateTime.Now.AddDays(15)),
                    Status = Enums.VacationRequestStatus.Pending,
                    Comment = "Family vacation",
                    CreatedAt = DateTime.Now
            },
            new VacationRequest() {
                Id = 2,
                    UserId = 1,
                    RequestedBy = new User {
                        Id = 1,
                        FirstName = "Meore",
                        LastName = "Meoreshvili",
                        Email = "Meore@gmail.com",
                        PasswordHash = "hashedpassword",
                        Role = Enums.UserRole.Employee,
                        RemainingVacationDays = 15,
                        CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                    },
                    StartDate = DateOnly.FromDateTime(DateTime.Now.AddDays(20)),
                    EndDate = DateOnly.FromDateTime(DateTime.Now.AddDays(25)),
                    Status = Enums.VacationRequestStatus.Pending,
                    Comment = "Family vacation2",
                    CreatedAt = DateTime.Now
            }
        };

        [HttpGet]
        public ActionResult<List<VacationRequest>> GetVacationRequests()
        {
            return Ok(vacationrequests);
        }

        [HttpGet("{id}")]
        public ActionResult<VacationRequest> GetVacationRequestById(int id)
        {
            var VacationRequest = vacationrequests.FirstOrDefault(item => item.Id == id);
            if (VacationRequest == null) 
                return NotFound();
            return Ok(VacationRequest);
        }

        [HttpPost]
        public ActionResult<VacationRequest> CreateVacationRequest(VacationRequestDTO dto)
        {
            if(dto == null)
                return BadRequest();
            if (dto.EndDate < dto.StartDate)
                return BadRequest("End date cannot be earlier than start date.");
            var vacationRequest = new VacationRequest
            {
                Id = vacationrequests.Count != 0 ? vacationrequests.Max(x => x.Id) + 1 : 1,
                UserId = dto.UserId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Comment = dto.Comment,
                Status = Enums.VacationRequestStatus.Pending,
                CreatedAt = DateTime.Now
            };

            vacationrequests.Add(vacationRequest);
            return CreatedAtAction(nameof(GetVacationRequestById), new { id = vacationRequest.Id }, vacationRequest);
        }

        [HttpPut("{id}")]
        public ActionResult<VacationRequest> ChangeVacationRequest(int id, UpdateVacationRequestDTO dto)
        {
            if (dto == null)
                return BadRequest();
            var existingRequest= vacationrequests.FirstOrDefault(item => item.Id == id);

            if (existingRequest == null)
                return NotFound();

            if(existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return BadRequest("Only pending requests can be updated.");

            if(dto.EndDate < dto.StartDate)
                return BadRequest("End date cannot be earlier than start date.");

            existingRequest.StartDate = dto.StartDate;
            existingRequest.EndDate = dto.EndDate;

            if (!string.IsNullOrWhiteSpace(dto.Comment))
            {
                existingRequest.Comment = dto.Comment;
            }
               
            return Ok(existingRequest);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteVacationRequestById(int id)
        {
            var existingRequest = vacationrequests.FirstOrDefault(item => item.Id == id);
            if (existingRequest == null)
                return NotFound();

            if(existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return BadRequest("Only pending requests can be deleted.");

            vacationrequests.Remove(existingRequest);
            return NoContent();
        }

        [HttpPost("{id}/approve")]
        public ActionResult<VacationRequest> ApproveVacationRequestById(int id)
        {
            var existingRequest = vacationrequests.FirstOrDefault(item => item.Id == id);
            if (existingRequest == null)
                return NotFound();
            if(existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return BadRequest($"The request is already {existingRequest.Status}");
            existingRequest.Status = Enums.VacationRequestStatus.Approved;
            existingRequest.DecisionDate = DateTime.Now;

            // TODO: replace with authenticated user once auth is implemented
            existingRequest.ReviewedById = 1;
            
            return Ok(existingRequest);
        }

        [HttpPost("{id}/reject")]
        public ActionResult<VacationRequest> RejectVacationRequestById(int id)
        {
            var existingRequest = vacationrequests.FirstOrDefault(item => item.Id == id);
            if (existingRequest == null)
                return NotFound();
            if (existingRequest.Status != Enums.VacationRequestStatus.Pending)
                return BadRequest($"The request is already {existingRequest.Status}");
            existingRequest.Status = Enums.VacationRequestStatus.Rejected;
            existingRequest.DecisionDate = DateTime.Now;

            // TODO: replace with authenticated user once auth is implemented
            existingRequest.ReviewedById = 1;

            return Ok(existingRequest);
        }

    }
}
