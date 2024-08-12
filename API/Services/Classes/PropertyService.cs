using Microsoft.EntityFrameworkCore;
using Semsar_online.Data;
using Semsar_online.DTO_s;
using Semsar_online.Models;
using Semsar_online.Services.Interfaces;

namespace Semsar_online.Services.Classes
{
    public class PropertyService : IPropertyService
    {
        private readonly AppDbContext _context;
        public PropertyService(AppDbContext context) {
            _context = context;
        }
        public async Task<ResultDTO> AddReviewAsync(ReviewDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == dto.UserId);
            if (user is null)
                return new ResultDTO("User does not exist");
            var property = _context.Properties.FirstOrDefault(x => x.Id == dto.PropertyId);
            if (property is null)
                return new ResultDTO("Property does not exist");
            var review = new Review()
            {
                UserId = dto.UserId,
                PropertyId = dto.PropertyId,
                Comment = dto.Comment,
                Rating = dto.Rate,
            };
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return new ResultDTO("Review added successfully", true);
        }

        public async Task<ResultDTO> AddToFavAsync(FavDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == dto.UserId);
            if (user is null)
                return new ResultDTO("User does not exist");
            var property = _context.Properties.FirstOrDefault(x => x.Id == dto.PropertyId);
            if (property is null)
                return new ResultDTO("Property does not exist");
            var fav = new Favorite()
            {
                UserId = dto.UserId,
                PropertyId = dto.PropertyId
            };
            user.Favorites?.Add(fav);
            await _context.SaveChangesAsync();
            return new ResultDTO("Property added to favorites successfully", true);
        }

        public async Task<ResultDTO> BookAppointmentAsync(AppointmentDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == dto.UserId);
            if (user is null)
                return new ResultDTO("User does not exist");
            var property = _context.Properties.FirstOrDefault(x => x.Id == dto.PropertyId);
            if (property is null)
                return new ResultDTO("Property does not exist");
            user.Appointments?.Add(new Appointment()
            {
                UserId = dto.UserId,
                PropertyId = dto.PropertyId,
                AppointmentDate = dto.Date
            });
            await _context.SaveChangesAsync();
            return new ResultDTO("Appointment booked successfully", true);
        }

        public async Task<ResultDTO> CancelAppointmentAsync(AppointmentDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x=> x.Id == dto.UserId);
            if (user is null)
                return new ResultDTO("User does not exist");
            if (user.Appointments is null || !user.Appointments.Contains(new Appointment()
            {
                UserId = dto.UserId,
                PropertyId = dto.PropertyId,
                AppointmentDate = dto.Date
            }))
            {
                return new ResultDTO("Appointment does not exist");
            };
            user.Appointments.Remove(new Appointment()
            {
                UserId = dto.UserId,
                PropertyId = dto.PropertyId,
                AppointmentDate = dto.Date
            });
            await _context.SaveChangesAsync();
            return new ResultDTO("Appointment canceled successfully", true);
        }

        public async Task<ResultDTO> DeleteReviewAsync(ReviewDTO dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == dto.UserId);
            if(user is null)
                return new ResultDTO("User does not exist");
            var review = _context.Reviews.FirstOrDefault(x => x.UserId == dto.UserId && x.PropertyId == dto.PropertyId);
            if (review is null)
                return new ResultDTO("Review does not exist");
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return new ResultDTO("Review deleted successfully", true);
        }

        public async Task<List<PropertyDetailsDTO>?> GetPropertiesAsync(Func<PropertyDetailsDTO, bool> predicate)
        {
            return _context.Properties
                .Include(x => x.Company)
                .ThenInclude(c => c.User)
                .Select(x => new PropertyDetailsDTO()
                {
                    Id = x.Id,
                    Area = x.Area,
                    Description = x.Description,
                    DownPayment = x.DownPayment,
                    ListingDate = x.ListingDate,
                    NumberOfRooms = x.NumberOfRooms,
                    Price = x.Price,
                    Type = x.Type,
                    SellerId = x.SellerId,
                    Location = x.Location,
                    Status = x.Status,
                    company = new CompanyDTO()
                    {
                        Id = x.Company.Id,
                        City = x.Company.City,
                        Address = x.Company.Address,
                    },
                    seller = new SellerDTO()
                    {
                        Name = x.Company.User.UserName,
                        Email = x.Company.User.Email,
                        PhoneNumber = x.Company.User.PhoneNumber,
                        whatsApp = x.Company.User.WhatsApp
                    }
                })
                .Where(predicate)
                .ToList();
        }

        public async Task<List<Review>> GetReviews(Func<Review, bool> predicate)
        {
            return _context.Reviews
                .Include(x=> x.User)
                .Where(predicate)
                .ToList();
        }

        public async Task<ResultDTO> RemoveFromFavAsync(FavDTO dto)
        {
            var user = _context.Users.Include(x => x.Favorites).FirstOrDefault(x => x.Id == dto.UserId);
            if(user is null || user.Favorites is null)
                return new ResultDTO("User does not exist");

            var res = user.Favorites.Remove(user.Favorites.FirstOrDefault(x => x.PropertyId == dto.PropertyId));
            if (!res)
                return new ResultDTO("Property does not exist in favorites");
            await _context.SaveChangesAsync();
            return new ResultDTO("Property removed from favorites successfully", true);
        }

        public async Task<ResultDTO> UpdateReviewAsync(ReviewDTO dto)
        {
            var user = _context.Users.Include(x=> x.Reviews).FirstOrDefault(x => x.Id == dto.UserId);
            if (user is null || user.Reviews is null)
                return new ResultDTO("Review does not exist");
            var review = user.Reviews.FirstOrDefault(x => x.PropertyId == dto.PropertyId);
            if (review is null)
                return new ResultDTO("Review does not exist");
            review.Comment = dto.Comment;
            review.Rating = dto.Rate;
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
            return new ResultDTO("Review updated successfully", true);
        }
    }
}
