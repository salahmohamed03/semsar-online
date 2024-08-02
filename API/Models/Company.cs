using System.ComponentModel.DataAnnotations;

namespace Semsar_online.Models
{
    public class Company
    {
        [Key]
        public string Id { get; set; }
        public string? City { get; set; }
        public string? Address { get; set; }

        public ICollection<Property>? Properties { get; set; }
        public User? User { get; set; }
    }
}
