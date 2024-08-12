using Semsar_online.DTO_s;
using Semsar_online.Models;

namespace Semsar_online.Services.Interfaces
{
    public interface IPropertyService
    {
        Task<List<PropertyDetailsDTO>?> GetPropertiesAsync(Func<PropertyDetailsDTO,bool> predicate);
        Task<ResultDTO> BookAppointmentAsync(AppointmentDTO dto);
        Task<ResultDTO> CancelAppointmentAsync(AppointmentDTO dto);
        Task<ResultDTO> AddReviewAsync(ReviewDTO dto);
        Task<ResultDTO> UpdateReviewAsync(ReviewDTO dto);
        Task<List<Review>> GetReviews(Func<Review, bool> predicate); 
        Task<ResultDTO> DeleteReviewAsync(ReviewDTO dto);
        Task<ResultDTO> AddToFavAsync(FavDTO dto);
        Task<ResultDTO> RemoveFromFavAsync(FavDTO dto);
    }
}
