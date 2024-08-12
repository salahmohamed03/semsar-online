using Microsoft.EntityFrameworkCore;

namespace Semsar_online.Models
{
    [Owned]
    public class Favorite
    {
        public string UserId { get; set; }
        public int PropertyId { get; set; }
        public User? User { get; set; }
        public Property? Property { get; set; }
    }
}
