using Microsoft.EntityFrameworkCore;
using SpendTrack.Api.Data;
using SpendTrack.Api.DTOs;
using SpendTrack.Api.Entities;
using SpendTrack.Api.Enums;

namespace SpendTrack.Api.Services
{
    public class TransactionService
    {
        private readonly ApplicationDbContext _context;
        private readonly int _legalAge;

        public TransactionService(ApplicationDbContext context, IConfiguration configuration) 
        {
            _context = context;
            _legalAge = configuration.GetValue<int>("BusinessRules:LegalAge");
        }

        public async Task<List<Transaction>> GetAllTransactions()
        {
            return await _context.Transactions
                .Include(t => t.Category)
                .Include(t => t.Person)
                .OrderByDescending(t => t.Id)
                .ToListAsync();
        }

        public async Task<Transaction> CreateTransaction(CreateTransactionDto transactionDto)
        {
            var person = await _context.Persons.FindAsync(transactionDto.PersonId);
            if (person == null)
            {
                return null;
            }

            var category = await _context.Categories.FindAsync(transactionDto.CategoryId); 
            if (category == null) 
            {
                return null;
            }

            if (person.Age < _legalAge && transactionDto.Type == TransactionType.Income) 
            {
                return null;
            }

            if (category.Purpose == CategoryPurpose.Expense && transactionDto.Type == TransactionType.Income)
            {
                return null;
            }

            if (category.Purpose == CategoryPurpose.Income && transactionDto.Type == TransactionType.Expense)
            {
                return null;
            }

            var transaction = new Transaction
            {
                Description = transactionDto.Description,
                Amount = transactionDto.Amount,
                Type = transactionDto.Type,
                CategoryId = transactionDto.CategoryId,
                PersonId = transactionDto.PersonId,
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }
    }
}