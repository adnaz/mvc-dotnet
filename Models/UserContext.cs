using Microsoft.EntityFrameworkCore;

namespace storeApp.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Os> Oss { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }

        public DbSet<Player> Player { get; set; }
        public DbSet<Seed> Seed { get; set; }
        public DbSet<Tournament> Tournament { get; set; }
    }
}