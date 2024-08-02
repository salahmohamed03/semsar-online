using System.Text.Json.Serialization;

namespace Semsar_online.DTO_s
{
    public class AuthDTO
    {
        public string? Email { get; set; }
        public string? Message { get; set; }
        public string? Token { get; set; }
        public string? Username { get; set; }
        public bool IsAuthenticated { get; set; }
        public IEnumerable<string>? Roles { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
