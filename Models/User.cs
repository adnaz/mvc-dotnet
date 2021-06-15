using System.Collections.Generic;
namespace storeApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public double Credit { get; set; }
        public string Token { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]

        public List<Application> Applications {get; set;}
        [System.Text.Json.Serialization.JsonIgnore]
        public List<ApplicationUser> ApplicationUsers {get; set;}

    }
    public class ApplicationUser
    {
        public int Id { get; set; }
        public int ApplicationId { get; set; }
        public Application Application {get; set;}
        public int UserId { get; set; }
        
         [System.Text.Json.Serialization.JsonIgnore]
        public User User {get; set;}

        public string Version { get; set; }

    }
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public double Credit { get; set; }
         public string Token { get; set; }
        // public List<Application> Applications {get; set;}


    }
}