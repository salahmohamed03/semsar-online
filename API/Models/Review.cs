using System.ComponentModel.DataAnnotations;

namespace Semsar_online.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PropertyId { get; set; }
        [MaxLength(500)]
        public string Comment { get; set; } = string.Empty;
        [Range(1, 5)]
        public int Rating { get; set; }
        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public Property? Property { get; set; }
    }
}
