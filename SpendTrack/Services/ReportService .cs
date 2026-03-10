using Microsoft.EntityFrameworkCore;
using SpendTrack.Api.Data;
using SpendTrack.Api.DTOs;
using SpendTrack.Api.Enums;

namespace SpendTrack.Api.Services
{
    public class ReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ReportSummaryDto> GetTotalsByPerson()
        {
            var persons = await _context.Persons.ToListAsync();
            var transactions = await _context.Transactions.ToListAsync();

            var personTotals = persons.Select(p =>
            {
                var personTransactions = transactions.Where(t => t.PersonId == p.Id);

                var totalIncome = personTransactions
                    .Where(t => t.Type == TransactionType.Income)
                    .Sum(t => t.Amount);

                var totalExpense = personTransactions
                    .Where(t => t.Type == TransactionType.Expense)
                    .Sum(t => t.Amount);

                return new PersonTotalsDto(
                    p.Id,
                    p.Name,
                    totalIncome,
                    totalExpense,
                    totalIncome - totalExpense
                    );
            }).ToList();

            var totalGeneralIncome = personTotals.Sum(p => p.TotalIncome);
            var totalGeneralExpense = personTotals.Sum(p => p.TotalExpense);

            return new ReportSummaryDto(
                personTotals,
                totalGeneralIncome,
                totalGeneralExpense,
                totalGeneralIncome - totalGeneralExpense);
        }

        public async Task<CategoryReportSummaryDto> GetTotalsByCategory()
        {
            var categories = await _context.Categories.ToListAsync();
            var transactions = await _context.Transactions.ToListAsync();

            var categoryTotals = categories.Select(c =>
            {
                var categoryTransactions = transactions.Where(t => t.CategoryId == c.Id);

                var totalIncome = categoryTransactions
                    .Where(t => t.Type == TransactionType.Income)
                    .Sum(t => t.Amount);

                var totalExpense = categoryTransactions
                    .Where(t => t.Type == TransactionType.Expense)
                    .Sum(t => t.Amount);

                return new CategoryTotalsDto(
                    c.Id,
                    c.Description,
                    totalIncome,
                    totalExpense,
                    totalIncome - totalExpense
                );
            }).ToList();

            var totalGeneralIncome = categoryTotals.Sum(c => c.TotalIncome);
            var totalGeneralExpense = categoryTotals.Sum(c => c.TotalExpense);

            return new CategoryReportSummaryDto(
                categoryTotals,
                totalGeneralIncome,
                totalGeneralExpense,
                totalGeneralIncome - totalGeneralExpense
            );
        }
    }
}