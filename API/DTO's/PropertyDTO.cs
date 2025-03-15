using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Semsar_online.DTO_s
{
    public class PropertyDTO
    {
        public int Id { get; set; }
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
        public DateTime ListingDate { get; set; }
        [Required]
        public int DownPayment { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string[] Images {get;set;}
    }
}
