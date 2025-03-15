using System.ComponentModel.DataAnnotations;

namespace Semsar_online.DTO_s
{
    public class CompanyDTO
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name {get; set;}
        public string? City { get; set; }
        public string? Address { get; set; }
        public string? Image { get; set; }
        public string? Description {get;set;}
    }
}
