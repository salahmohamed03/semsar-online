using Semsar_online.DTO_s;
namespace Semsar_online.Services.Interfaces
{
    public interface ICompanyService
    {
        Task<ResultDTO> AddCompany(CompanyDTO dto);
        Task<CompanyDTO?> GetCompanies(Func<CompanyDTO,bool> predicate);
        Task<ResultDTO> UpdateCompany(CompanyDTO dto);
        Task<ResultDTO> DeleteCompany(string id);
        Task<List<PropertyDTO>?> GetProperties(string id);
        Task<ResultDTO> UpdateProperty(PropertyDTO dto);
        Task<ResultDTO> DeleteProperty(int id);
        Task<ResultDTO> AddProperty(PropertyDTO dto,string SellerId);
    }
}
