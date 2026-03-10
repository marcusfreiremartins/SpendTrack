using Microsoft.AspNetCore.Mvc;
using SpendTrack.Api.DTOs;
using SpendTrack.Api.Services;

namespace SpendTrack.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            try
            {
                var transactions = await _transactionService.GetAllTransactions();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionDto transactionDto)
        {
            try
            {
                var created = await _transactionService.CreateTransaction(transactionDto);
                if (created == null)
                {
                    return BadRequest("Não foi possivel criar a transação.");
                }
                return CreatedAtAction(nameof(GetAllTransactions), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}