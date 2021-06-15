using System.Collections.Generic;

namespace storeApp.Models
{
    public class Seed
    {
        public int Id { get; set; }
        public string PlayerOne { get; set; }
        public string playerTwo { get; set; }
        public int Winner { get; set; }
        
        public int TournamentId { get; set; }
        
        [System.Text.Json.Serialization.JsonIgnore]
        public Tournament Tournament {get; set;}


    }
}