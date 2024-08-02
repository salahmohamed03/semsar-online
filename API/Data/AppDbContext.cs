using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Semsar_online.Models;

namespace Semsar_online.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Property> Properties { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Appointment> Appointments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole>()
                .HasData(
                new IdentityRole
                { Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString(), Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole
                { Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString(), Name = "Client", NormalizedName = "CLIENT" },
                new IdentityRole
                { Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString(), Name = "Company", NormalizedName = "COMPANY" }
                );

            modelBuilder.Entity<User>()
                .HasOne(u => u.Company)
                .WithOne(c => c.User)
                .HasForeignKey<Company>(c => c.Id);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Reviews)
                .WithOne(r => r.User)
                .HasForeignKey(Review => Review.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            

            modelBuilder.Entity<Company>()
                .HasMany(x => x.Properties)
                .WithOne(p => p.Company)
                .HasForeignKey(x => x.SellerId)
                .OnDelete(DeleteBehavior.Restrict);
            

            modelBuilder.Entity<User>()
                .HasMany(x => x.Appointments)
                .WithOne(a => a.User)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            

            modelBuilder.Entity<Property>()
                .HasMany(x => x.Appointments)
                .WithOne(a => a.Property)
                .HasForeignKey(x => x.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Property>()
                .HasMany(x => x.Reviews)
                .WithOne(r => r.Property)
                .HasForeignKey(x => x.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
