using System.ComponentModel.DataAnnotations;

namespace Semsar_online.DTO_s
{
    public class ReviewDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PropertyId { get; set; }
        public string Comment { get; set; } = string.Empty;
        [Range(1, 5)]
        public int Rate { get; set; } = 5;
        public DateTime ReviewDate { get; set; } = DateTime.Now;
    }
}