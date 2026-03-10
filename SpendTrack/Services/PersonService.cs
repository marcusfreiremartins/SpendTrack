using Microsoft.EntityFrameworkCore;
using SpendTrack.Api.Data;
using SpendTrack.Api.Entities;

namespace SpendTrack.Api.Services
{
    public class PersonService
    {
        private readonly ApplicationDbContext _context;

        public PersonService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Person>> GetallPersons()
        {
            return await _context.Persons
                .OrderByDescending(p => p.Id)
                .ToListAsync();
        }

        public async Task<Person?> GetPersonById(int personId)
        {
            return await _context.Persons
                .FindAsync(personId);
        }

        public async Task<Person> CreatePerson(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<Person> UpdatePerson(Person person, int personId)
        {
            var existingPerson = await _context.Persons.FindAsync(personId);

            if (existingPerson == null)
            {
                return null;
            }

            existingPerson.Name = person.Name;
            existingPerson.Age = person.Age;

            await _context.SaveChangesAsync();
            return existingPerson;
        }

        public async Task<Person> DeletePerson(int personId)
        {
            var existingPerson = await _context.Persons.FindAsync(personId);
            
            if (existingPerson == null)
            {
                return null;
            }

            var existingTransactions = await _context.Transactions
                .Where(t => t.PersonId == personId)
                .ToListAsync();

            existingPerson.DeletionDate = DateTime.UtcNow;

            foreach (var transaction in existingTransactions)
            {
                transaction.DeletionDate = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return existingPerson;
        }
    }
}