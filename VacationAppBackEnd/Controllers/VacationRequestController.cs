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
        public async Task<ActionResult<List<VacationRequest>>> GetVacationRequests()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VacationRequest>> GetVacationRequestById(int id)
        {
            var VacationRequest = await _service.GetByIdAsync(id);
            if (VacationRequest == null) 
                return NotFound();
            return Ok(VacationRequest);
        }

        [HttpPost]
        public async Task<ActionResult<VacationRequest>> CreateVacationRequest(VacationRequestDTO dto)
        {
            if(dto == null)
                return BadRequest();

            try
            {
                var vacationRequest = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetVacationRequestById), new { id = vacationRequest.Id }, vacationRequest);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

          
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<VacationRequest>> ChangeVacationRequest(int id, UpdateVacationRequestDTO dto)
        {
            if (dto == null)
                return BadRequest();
            try
            {
                var result = await _service.UpdateAsync(id, dto);
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
        public async Task<ActionResult> DeleteVacationRequestById(int id)
        {
            try
            {
                var result = await _service.DeleteAsync(id);

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
        public async Task<ActionResult<VacationRequest>> ApproveVacationRequestById(int id)
        {
            try
            {
                var result = await _service.ApproveAsync(id);
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
        public async Task<ActionResult<VacationRequest>> RejectVacationRequestById(int id)
        {
            try
            {
                var result = await _service.RejectAsync(id);
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
