using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Semsar_online.DTO_s;
using Semsar_online.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace Semsar_online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }
        [Authorize] 
        [HttpGet("GetMyCompany")]
        public async Task<IActionResult> GetMyCompany()
        {
            var userId = getUserIdFromToken();
            if (userId == null)
                return BadRequest("Invalid request");

            var company = await _companyService.GetCompanies(x=> x.Id == userId);

            if (company == null)
                return Ok(company);

            return Ok(company);
        }

        [HttpGet("GetCompanies")]
        public async Task<IActionResult> GetCompanies()
        {
            var compnaies = await _companyService.GetCompanies(x => true);
            return Ok(compnaies);
        }
        [HttpPost("AddCompany")]
        [Authorize]
        public async Task<IActionResult> AddCompany(CompanyDTO dto)
        {
            var result = await _companyService.AddCompany(dto);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpPut("UpdateCompany")]
        [Authorize]
        public async Task<IActionResult> UpdateCompany(CompanyDTO dto)
        {
            var result = await _companyService.UpdateCompany(dto);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpDelete("DeleteProperty")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var result = await _companyService.DeleteProperty(id);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpGet("GetProperties")]
        public async Task<IActionResult> GetProperties(string id)
        {
            var properties = await _companyService.GetProperties(id);
            return Ok(properties);
        }
        [HttpPut("UpdateProperty")]
        public async Task<IActionResult> UpdateProperty(PropertyDTO dto)
        {
            var result = await _companyService.UpdateProperty(dto);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [NonAction]
        private string? getUserIdFromToken()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            return tokenS?.Claims.First(claim => claim.Type == "uid").Value;
        }
    }
}
