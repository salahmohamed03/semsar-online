using Semsar_online.DTO_s;

namespace Semsar_online.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<AuthDTO> RegisterAsync(RegisterDTO model);
        public Task<AuthDTO> GetTokenAsync(LoginDTO model);
        public Task<AuthDTO> RefreshTokenAsync(string email, string token);
    }
}
