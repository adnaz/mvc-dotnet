using System.Collections.Generic;
using System;


namespace storeApp.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        public int Rank { get; set; }
        public DateTime DateTime { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public int Titles { get; set; }
        public int Wins { get; set; }
        public int losses { get; set; }
        
    }
}