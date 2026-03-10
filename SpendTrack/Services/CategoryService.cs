using Microsoft.EntityFrameworkCore;
using SpendTrack.Api.Data;
using SpendTrack.Api.Entities;

namespace SpendTrack.Api.Services
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories
                .OrderByDescending(c => c.Id)
                .ToListAsync();
        }

        public async Task<Category> CreateCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }
    }
}