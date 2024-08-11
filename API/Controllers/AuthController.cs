using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
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

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }


        public record RefreshTokenDTO(string Email);
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenDTO dto)
        {
            var token = Request.Cookies["rt"];
            if (token == null)
                return BadRequest("Invalid request");

            var result = await _authService.RefreshTokenAsync(dto.Email,token);

            if (!result.IsAuthenticated)
                return BadRequest(result);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }
        [HttpGet("getCookie")]
        [Authorize]
        public async Task<IActionResult> GetCookie()
        {
            string? token = Request.Cookies["rt"];

            return Ok(new {cookie = token});
        }

        [HttpGet("setCookie")]
        public async Task<IActionResult> SetCookie()
        {
            var cookieOption = new CookieOptions()
            {
                /*HttpOnly = true,*/
                Expires = DateTime.Now.AddMinutes(10)
            };
            HttpContext.Response.Cookies.Append("test", "test", cookieOption);

            return Ok();
        }   
        [NonAction]
        public void SetRefreshTokenInCookie(string token, DateTime expiresOn)
        {
            var cookieOption = new CookieOptions()
            {
                /*HttpOnly = true,*/
                Expires = expiresOn.AddMinutes(1),
                
            };
            HttpContext.Response.Cookies.Append("rt", token, cookieOption);
        }

    }
}
