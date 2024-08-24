using Humanizer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Semsar_online.Data;
using Semsar_online.DTO_s;
using Semsar_online.Models;
using Semsar_online.Services.Interfaces;
using System.Drawing;
using System.Text.RegularExpressions;

namespace Semsar_online.Services.Classes
{
    public class CompanyService : ICompanyService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<User> _userManager;
        public CompanyService(AppDbContext context,UserManager<User> usermanager,IWebHostEnvironment webHostEnvironment = null)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _userManager = usermanager;
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
            await SaveImage(dto.Image, dto.Id);
            string? img = GetImage(dto.Id);
            var company = new Company()
            {
                Id = dto.Id,
                City = dto.City,
                Address = dto.Address,
                Image = img
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

        public async Task<CompanyDTO?> GetCompanies(Func<CompanyDTO,bool> predicate)
        {
            var company = _context.Companies
                .Select(x => new CompanyDTO() {
                    Address = x.Address,
                    City = x.City,
                    Id = x.Id
                })
                .FirstOrDefault(predicate);
            if (company == null)
                return null;
            return company;
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
        public async Task SaveImage(string? imageBase64,string id)
        {
            if (!string.IsNullOrEmpty(imageBase64))
            {
                
                var base64Data = Regex.Match(imageBase64, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
                byte[] imageBytes = Convert.FromBase64String(base64Data);
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                Directory.CreateDirectory(uploadsFolder);
                var filePath = Path.Combine(uploadsFolder, $"{id}co.jpg");
                await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);
            }
        }

        public string? GetImage(string id)
        {
            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploadsFolder, $"{id}co.jpg");

            string image = Convert.ToBase64String(System.IO.File.ReadAllBytes(filePath));
            return image;
        }
    }
}
