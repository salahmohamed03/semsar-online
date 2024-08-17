
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Semsar_online.DTO_s;

using Semsar_online.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;

namespace Semsar_online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserActionsController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        public UserActionsController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }
        public record Filter(string? type,string? status,string? location);
        [HttpGet("GetProperties")]
        public async Task<IActionResult> GetProperties(Filter filter)
        {
            bool expression(PropertyDetailsDTO x) => 
                (filter.type == null || x.Type == filter.type) &&
                (filter.status == null || x.Status == filter.status) &&
                (filter.location == null || x.Location == filter.location);
            var properties = await _propertyService.GetPropertiesAsync(x => expression(x));

            return Ok(properties);
        }
        [HttpPost("BookAppointment")]
        public async Task<IActionResult> BookAppointment(AppointmentDTO dto)
        {
            var result = await _propertyService.BookAppointmentAsync(dto);
            if(result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpDelete("CancelAppointment")]
        public async Task<IActionResult> CancelAppointment(AppointmentDTO dto)
        {
            var result = await _propertyService.CancelAppointmentAsync(dto);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpPost("AddReview")]
        public async Task<IActionResult> AddReview(ReviewDTO dto)
        {
            var result = await _propertyService.AddReviewAsync(dto);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }
        [HttpPut("UpdateReview")]
        public async Task<IActionResult> UpdateReview(ReviewDTO dto)
        {
            var result = await _propertyService.UpdateReviewAsync(dto);
            if (result.IsSuccess)
                return Ok(result);
            return BadRequest(result);
        }
        [HttpGet("GetReviews/{propertyId}")]
        public async Task<IActionResult> GetReviews([FromRoute] int propertyId)
        {
            var reviews = await _propertyService.GetReviews(x => x.PropertyId == propertyId);
            return Ok(reviews);
        }
        [HttpDelete("DeleteReview")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(ReviewDTO dto)
        {

            var userId = getUserIdFromToken();

            if (!string.IsNullOrEmpty(userId))
            {
                var result = await _propertyService.DeleteReviewAsync(dto);
                if (result.IsSuccess)
                    return Ok(result);
                return BadRequest(result);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("AddToFav")]
        public async Task<IActionResult> AddToFav(FavDTO dto)
        {
            var result = await _propertyService.AddToFavAsync(dto);
            if (result.IsSuccess)
                return Ok(result);
            return BadRequest(result);
        }
        [HttpDelete("RemoveFromFav")]
        public async Task<IActionResult> RemoveFromFav(FavDTO dto)
        {
            var result = await _propertyService.RemoveFromFavAsync(dto);
            if (result.IsSuccess)
                return Ok(result);
            return BadRequest(result);
        }


        [NonAction]
        private string? getUserIdFromToken()
        {
            var token = Response.Headers.Authorization;
            var tokenValue = token.ToString().Split(" ").LastOrDefault();
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(tokenValue);
            return jwtToken.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
        }
    }
}
