using Microsoft.AspNetCore.Mvc;
using SpendTrack.Api.Services;

namespace SpendTrack.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ReportService _reportService;

        public ReportController(ReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("persons")]
        public async Task<IActionResult> GetTotalsByPerson()
        {
            try
            {
                var report = await _reportService.GetTotalsByPerson();
                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetTotalsByCategory()
        {
            try
            {
                var report = await _reportService.GetTotalsByCategory();
                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}