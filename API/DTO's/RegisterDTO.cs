using System.ComponentModel.DataAnnotations;

namespace Semsar_online.DTO_s
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [MaxLength(25)]
        [MinLength(5)]
        public string Username { get; set; }
        [Phone]
        public string Phone { get; set; }
        [Phone]
        public string WhatsApp { get; set; }

    }
}
