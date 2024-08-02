using System.ComponentModel.DataAnnotations;

namespace Semsar_online.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PropertyId { get; set; }
        [Required]
        public DateTime AppointmentDate { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public Property? Property { get; set; }
    }
}
