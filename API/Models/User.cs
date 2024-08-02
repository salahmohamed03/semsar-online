using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Semsar_online.Models
{
    public class User : IdentityUser
    {
        [Phone]
        public string? WhatsApp {  get; set; }

        public Company? Company { get; set; }
        public ICollection<Review>? Reviews { get; set; }
        
        public ICollection<Appointment>? Appointments { get; set; }
        public List<RefreshToken>? RefreshTokens { get; set; }
    }
}
