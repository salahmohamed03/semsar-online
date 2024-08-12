using System.ComponentModel.DataAnnotations;

namespace Semsar_online.DTO_s
{
    public class PropertyDetailsDTO
    {
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
        public DateTime ListingDate { get; set; }
        [Required]
        public int DownPayment { get; set; }
        [Required]
        public string Status { get; set; }
        public SellerDTO? seller { get; set; }
        public CompanyDTO? company { get; set; }
    }
}
