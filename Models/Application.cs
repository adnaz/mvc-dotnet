using System.Collections.Generic;
namespace storeApp.Models
{
    public class Application
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Size { get; set; }
        public string Image { get; set; }
        public string version { get; set; }
        public double price { get; set; }

        public int UserId { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public User User {get; set;}

        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<Os> Oss {get; set;}
    }
    public  class Os{
         public int Id { get; set; }
        public string Name { get; set; }

       public ICollection<Application> Applications {get; set;}

    }
}