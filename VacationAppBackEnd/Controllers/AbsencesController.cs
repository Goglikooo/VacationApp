using Microsoft.AspNetCore.Mvc;
using VacationAppBackEnd.DTOs;
using VacationAppBackEnd.Services;

namespace VacationAppBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AbsencesController : ControllerBase
    {
        private readonly IAbsenceService  _service;

        public AbsencesController(IAbsenceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<AbsenceDTO>>> GetAbsences([FromQuery] DateOnly date)
        {
            var absences = await _service.GetAbsenceListAsync(date);
            return Ok(absences);
        }
    }
}
