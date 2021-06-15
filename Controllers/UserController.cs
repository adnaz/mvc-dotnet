using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using storeApp.Models;
namespace storeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.Include(x => x.Applications).ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users.Include(x => x.Applications).FirstOrDefaultAsync(e => e.Id == id);
            // return user;
            var userDto = new UserDto();
            userDto.Id = user.Id;
            userDto.UserName = user.UserName;
            userDto.Credit = user.Credit;
            // userDto.Applications= user.Applications;

            if (user == null)
            {
                return NotFound();
            }

            return userDto;
        }
        // GET: api/User/5
        [HttpGet("login")]
        public async Task<ActionResult<UserDto>> LogintUser(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(e => e.UserName == username && e.Password == password);
            // return user;
            var userDto = new UserDto();
            userDto.Id = user.Id;
            userDto.UserName = user.UserName;
            userDto.Credit = user.Credit;
            userDto.Token = user.Token;

            // userDto.Applications= user.Applications;

            if (user == null)
            {
                return NotFound();
            }

            return userDto;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id,user.UserName))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var resultToken = new string(
               Enumerable.Repeat(allChar, 16)
               .Select(token => token[random.Next(token.Length)]).ToArray());

            user.Token = resultToken.ToString();
            user.Credit = 100;
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id,user.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id,string username)
        {
            return _context.Users.Any(e => e.Id == id && e.UserName == username);
        }
    }
}
