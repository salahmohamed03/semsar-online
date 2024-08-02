using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Semsar_online.DTO_s;
using Semsar_online.Services.Interfaces;

namespace Semsar_online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(dto);

            if (!result.IsAuthenticated)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.GetTokenAsync(dto);

            if (!result.IsAuthenticated)
                return BadRequest(result);

            SetRefreshTokenInCookie(result.RefreshToken , result.RefreshTokenExpiration);

            return Ok(result);
        }

        public record RefreshTokenDTO(string? token,string Email);
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenDTO dto)
        {
            var token = Request.Cookies["refreshToken"]?? dto.token;
            if (token == null)
                return BadRequest("Invalid request");

            var result = await _authService.RefreshTokenAsync(dto.Email,token);

            if (!result.IsAuthenticated)
                return BadRequest(result);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok();
        }

        [NonAction]
        public void SetRefreshTokenInCookie(string token,DateTime expiresOn)
        {
            var cookieOption = new CookieOptions()
            {
                Expires = expiresOn,
                HttpOnly = true
            };
            Response.Cookies.Append("refreshToken", token, cookieOption);
        }

    }
}
