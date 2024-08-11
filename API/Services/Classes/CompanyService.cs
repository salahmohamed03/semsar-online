using Humanizer;
using Microsoft.EntityFrameworkCore;
using Semsar_online.Data;
using Semsar_online.DTO_s;
using Semsar_online.Models;
using Semsar_online.Services.Interfaces;

namespace Semsar_online.Services.Classes
{
    public class CompanyService : ICompanyService
    {
        private readonly AppDbContext _context;
        public CompanyService(AppDbContext context) {
            _context = context;
        }
        private bool CompanyExists(string id)
        {
            if (_context.Companies.FirstOrDefault(x => x.Id == id) == null)
                return false;
            return true;
        }
        private bool PropertyExists(int id)
        {
            if (_context.Properties.FirstOrDefault(x => x.Id == id) == null)
                return false;
            return true;
        }
        public async Task<ResultDTO> AddCompany(CompanyDTO dto)
        {
            if(CompanyExists(dto.Id))
                return new ResultDTO("Company already exists");
            var company = new Company()
            {
                Id = dto.Id,
                City = dto.City,
                Address = dto.Address
            };
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
            return new ResultDTO("Company added successfully" ,true);
        }

        public async Task<ResultDTO> DeleteProperty(int id)
        {
            var property = _context.Properties.FirstOrDefault(x => x.Id == id);
            if (property == null)
                return new ResultDTO("Property does not exist");
            if(property.deleted)
                return new ResultDTO("Property already deleted");
            property.Delete();
            _context.Properties.Update(property);
            await _context.SaveChangesAsync();
            return new ResultDTO("Property deleted successfully", true);
        }

        public async Task<CompanyDTO?> GetCompany(string id)
        {
            var company = _context.Companies.FirstOrDefault(x => x.Id == id);
            if (company == null)
                return null;
            return new CompanyDTO()
            {
                Id = company.Id,
                City = company.City,
                Address = company.Address
            };
        }

        public async Task<List<PropertyDTO>?> GetProperties(string id)
        {
            if (!CompanyExists(id))
                return null;
            return await _context.Properties
                .Where(x => x.SellerId == id)
                .Select(p => new PropertyDTO()
                {
                    Id = p.Id,
                    Area = p.Area,
                    DownPayment = p.DownPayment,
                    ListingDate = p.ListingDate,
                    Price = p.Price,
                    NumberOfRooms = p.NumberOfRooms,
                    Description = p.Description,
                    Type = p.Type,
                    SellerId = p.SellerId
                })
                .ToListAsync();
        }

        public async Task<ResultDTO> UpdateCompany(CompanyDTO dto)
        {
            if(!CompanyExists(dto.Id))
                return new ResultDTO("Company does not exist");
            _context.Companies.Update(new Company()
            {
                Id = dto.Id,
                City = dto.City,
                Address = dto.Address
            });
            await _context.SaveChangesAsync();
            return new ResultDTO("Company updated successfully", true);
        }

        public async Task<ResultDTO> UpdateProperty(PropertyDTO dto)
        {
            if(!PropertyExists(dto.Id))
                return new ResultDTO("Property does not exist");
            _context.Properties.Update(new Property() 
            {
                Id = dto.Id,
                Area = dto.Area,
                DownPayment = dto.DownPayment,
                ListingDate = dto.ListingDate,
                Price = dto.Price,
                NumberOfRooms = dto.NumberOfRooms,
                Description = dto.Description,
                Type = dto.Type,
                SellerId = dto.SellerId
            });
            await _context.SaveChangesAsync();
            return new ResultDTO("Property updated successfully", true);
        }
    }
}
