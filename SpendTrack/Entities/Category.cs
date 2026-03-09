using SpendTrack.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace SpendTrack.Api.Entities
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(400)]
        public string Description { get; set; }

        public CategoryPurpose Purpose {  get; set; } 
    }
}