
using Semsar_online.DTO_s;
using Semsar_online.Models;

namespace Semsar_online.HelplerClasses
{
    public static class Extensions
    {
        public static PropertyDTO ToDTO(this Property model)
        {
            return new PropertyDTO()
            {
                Id = model.Id,
                Area = model.Area,
                DownPayment = model.DownPayment,
                ListingDate = model.ListingDate,
                Price = model.Price,
                NumberOfRooms = model.NumberOfRooms,
                Description = model.Description,
                Type = model.Type,
                Images = model.Images
            };
        }
        public static Property ToModel(this PropertyDTO dto, string SellerId)
        {
            return new Property()
            {
                Id = dto.Id,
                Area = dto.Area,
                DownPayment = dto.DownPayment,
                ListingDate = dto.ListingDate,
                Price = dto.Price,
                NumberOfRooms = dto.NumberOfRooms,
                Description = dto.Description,
                Type = dto.Type,
                Images = dto.Images,
                SellerId = SellerId
            };
        }
    }
}