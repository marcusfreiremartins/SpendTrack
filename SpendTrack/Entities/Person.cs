using System.ComponentModel.DataAnnotations;

namespace SpendTrack.Api.Entities
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public int Age { get; set; }

        public DateTime? DeletionDate { get; set; }
    }
}