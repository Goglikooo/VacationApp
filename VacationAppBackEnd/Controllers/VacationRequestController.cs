using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Models;
using VacationAppBackEnd.Services;

namespace VacationAppBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VacationRequestsController : ControllerBase
    {
        
        private readonly IVacationRequestService _service;
        public VacationRequestsController(IVacationRequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<VacationRequest>> GetVacationRequests()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<VacationRequest> GetVacationRequestById(int id)
        {
            var VacationRequest = _service.GetById(id);
            if (VacationRequest == null) 
                return NotFound();
            return Ok(VacationRequest);
        }

        [HttpPost]
        public ActionResult<VacationRequest> CreateVacationRequest(VacationRequestDTO dto)
        {
            if(dto == null)
                return BadRequest();

            try
            {
                var vacationRequest = _service.Create(dto);
                return CreatedAtAction(nameof(GetVacationRequestById), new { id = vacationRequest.Id }, vacationRequest);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

          
        }

        [HttpPut("{id}")]
        public ActionResult<VacationRequest> ChangeVacationRequest(int id, UpdateVacationRequestDTO dto)
        {
            if (dto == null)
                return BadRequest();
            try
            {
                var result = _service.Update(id, dto);
                if (result == null)
                    return NotFound();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpDelete("{id}")]
        public ActionResult DeleteVacationRequestById(int id)
        {
            try
            {
                var result = _service.Delete(id);

                if (!result)
                    return NotFound();

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("{id}/approve")]
        public ActionResult<VacationRequest> ApproveVacationRequestById(int id)
        {
            try
            {
                var result = _service.Approve(id);
                if (result == null)
                    return NotFound();


                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpPost("{id}/reject")]
        public ActionResult<VacationRequest> RejectVacationRequestById(int id)
        {
            try
            {
                var result = _service.Reject(id);
                if (result == null)
                    return NotFound();


                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
