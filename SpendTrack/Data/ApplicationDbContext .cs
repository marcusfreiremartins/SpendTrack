using SpendTrack.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace SpendTrack.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Categories");

                entity.Property(c => c.Purpose)
                    .HasConversion<string>();
            });

            // Person
            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Persons");

                entity.HasQueryFilter(p => p.DeletionDate == null);
            });

            // Transaction
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.ToTable("Transactions");

                entity.Property(t => t.Amount)
                    .HasColumnType("numeric(18,2)");

                entity.Property(t => t.Type)
                    .HasConversion<string>();

                entity.HasOne(t => t.Category)
                    .WithMany()
                    .HasForeignKey(t => t.CategoryId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(t => t.Person)
                    .WithMany()
                    .HasForeignKey(t => t.PersonId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasQueryFilter(t => t.DeletionDate == null);
            });
        }
    }
}