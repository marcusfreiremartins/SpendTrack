using Microsoft.AspNetCore.Mvc;
using SpendTrack.Api.Entities;
using SpendTrack.Api.Services;

namespace SpendTrack.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly PersonService _personService;

        public PersonController(PersonService PersonService)
        {
            _personService = PersonService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPersons()
        {
            try
            {
                var persons = await _personService.GetallPersons();
                return Ok(persons);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{personId}")]
        public async Task<IActionResult> GetPersonById(int personId)
        {
            try
            {
                var person = await _personService.GetPersonById(personId);
                return Ok(person);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody] Person person)
        {
            try
            {
                var created = await _personService.CreatePerson(person);
                return CreatedAtAction(nameof(GetAllPersons), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{personId}")]
        public async Task<IActionResult> UpdatePerson([FromBody] Person person, int personId)
        {
            try
            {
                var updated = await _personService.UpdatePerson(person, personId);
                if (updated == null)
                {
                    return NotFound("Pessoa não encontrada.");
                }

                return Ok(updated);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{personId}")]
        public async Task<IActionResult> DeletePerson(int personId)
        {
            try
            {
                var deleted = await _personService.DeletePerson(personId);
                if (deleted == null)
                {
                    return NotFound("Pessoa não encontrada.");
                }

                return Ok(deleted);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}