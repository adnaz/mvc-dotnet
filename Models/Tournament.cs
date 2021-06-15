using System.Collections.Generic;
using System;
namespace storeApp.Models
{
    public class Tournament
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public List<Seed> Seeds {get; set;}

    }
}