using System.ComponentModel.DataAnnotations;

namespace Semsar_online.Models
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string SellerId { get; set; }
        [Required]
        public int NumberOfRooms { get; set; }
        [Required]
        public float Area { get; set; }
        
        [Required]
        public int Price { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Type { get; set; }
        
        public string? Description { get; set; }
        [Required]
        public DateTime ListingDate { get; set; } = DateTime.Now;

        [Required]
        public int DownPayment {  get; set; }
        [Required]
        public string Status { get; set; }

        public bool deleted { get; set; } = false;
        public string[] Images {get;set;}
        public DateTime? DeletedAt { get; set; }

        public void Delete()
        {
            deleted = true;
            DeletedAt = DateTime.Now;
        }
        public Company? Company { get; set; }
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
    }
}
