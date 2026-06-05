using Microsoft.EntityFrameworkCore;
using VacationAppBackEnd.Models;

namespace VacationAppBackEnd.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<VacationRequest> VacationRequests { get; set; }
    }
}
