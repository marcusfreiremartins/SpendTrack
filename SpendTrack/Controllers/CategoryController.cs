using Microsoft.AspNetCore.Mvc;
using SpendTrack.Api.Entities;
using SpendTrack.Api.Services;

namespace SpendTrack.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService) 
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var categories = await _categoryService.GetAllCategories();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] Category category)
        {
            try
            {
                var created = await _categoryService.CreateCategory(category);
                return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}