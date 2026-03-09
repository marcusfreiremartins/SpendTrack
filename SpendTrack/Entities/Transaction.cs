using SpendTrack.Api.Entities;
using SpendTrack.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace SpendTrack.Api.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        [StringLength(400)]
        public string Description { get; set; }

        public decimal Amount { get; set; }

        public TransactionType Type { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int PersonId { get; set; }
        public Person Person { get; set; }

        public DateTime? DeletionDate { get; set; }
    }
}