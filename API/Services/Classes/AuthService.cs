using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Semsar_online.Data;
using Semsar_online.DTO_s;
using Semsar_online.Models;
using Semsar_online.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Semsar_online.Services.Classes
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly JWT _jwt;
        public AuthService(AppDbContext context,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<JWT> jwt) 
        { 
            _userManager = userManager;
            _jwt = jwt.Value;
        }
        public async Task<AuthDTO> GetTokenAsync(LoginDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if ( user is null || await _userManager.CheckPasswordAsync(user , model.Password))
            {
                return new AuthDTO() { Message = "Wrong email or password" };
            }

            var token = await CreateJwtTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var authModel = new AuthDTO()
            {
                Email = model.Email,
                Username = user.UserName,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Roles = roles.ToList()
            };
            if (user.RefreshTokens is not null && user.RefreshTokens.Any(x => x.IsActive))
            {
                var rt = user.RefreshTokens.First(x => x.IsActive);
                authModel.RefreshTokenExpiration = rt.ExpiresOn;
                authModel.RefreshToken = rt.Token;
            }
            else
            {
                var rt = GenerateRefreshToken();
                authModel.RefreshTokenExpiration = rt.ExpiresOn;
                authModel.RefreshToken = rt.Token;
                user.RefreshTokens.Add(rt);
                await _userManager.UpdateAsync(user);
            }
            return authModel;
        }

        public async Task<AuthDTO> RefreshTokenAsync(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);


            if (user == null || user.RefreshTokens.SingleOrDefault(x => x.IsActive && x.Token == token) is null)
                return new AuthDTO() { Message = "Invalid request" };

            var activert = user.RefreshTokens.Single(x => x.IsActive);
            activert.RevokedOn = DateTime.UtcNow;
            var newRefreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            await _userManager.UpdateAsync(user);

            var jwtToken = await CreateJwtTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            return new AuthDTO()
            {
                Email = email,
                IsAuthenticated = true,
                Roles = roles.ToList(),
                RefreshTokenExpiration = newRefreshToken.ExpiresOn,
                Username = user.UserName,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                RefreshToken = newRefreshToken.Token
            };
        }

        public async Task<AuthDTO> RegisterAsync(RegisterDTO model)
        {
            if(await _userManager.FindByEmailAsync(model.Email) is null)
                return new AuthDTO() { Message ="Email already exists" };
            if(await _userManager.FindByNameAsync(model.Username) is null)
                return new AuthDTO() { Message ="Username already exists" };

            var user = new User()
            {
                Email = model.Email,
                PhoneNumber = model.Phone,
                WhatsApp = model.WhatsApp,
                UserName = model.Username
            };

            var CreateResult = await _userManager.CreateAsync(user, model.Password);
            if (!CreateResult.Succeeded)
            {
                var erorrs = CreateResult.Errors
                    .Select(x => x.Description)
                    .Aggregate((x, y) => $"{x},\n{y}");
                return new AuthDTO() { Message = erorrs };
            }

            var AddRoleResult = await _userManager.AddToRoleAsync(user, "Client");

            if (!AddRoleResult.Succeeded)
            {
                var erorrs = AddRoleResult.Errors
                   .Select(x => x.Description)
                   .Aggregate((x, y) => $"{x},\n{y}");
                return new AuthDTO() { Message = erorrs };
            }   

            var token =await CreateJwtTokenAsync(user);
            return new AuthDTO()
            {
                Email = model.Email,
                Username = model.Username,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Roles = new List<string>() { "Client" },
                IsAuthenticated = true
            };
        }

        private async Task<JwtSecurityToken> CreateJwtTokenAsync(User user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
        private RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var rng = new RNGCryptoServiceProvider();

            rng.GetBytes(randomNumber);

            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                ExpiresOn = DateTime.UtcNow.AddMinutes(1),
                CreatedOn = DateTime.UtcNow
            };
        }
    }
}
