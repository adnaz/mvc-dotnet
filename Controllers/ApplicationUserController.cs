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
    public class ApplicationUserController : ControllerBase
    {
        private readonly UserContext _context;

        public ApplicationUserController(UserContext context)
        {
            _context = context;
        }

        // GET: api/ApplicationUser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetApplicationUser()
        {
            return await _context.ApplicationUser.Include(x => x.Application).ToListAsync();
        }

        // GET: api/ApplicationUser/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(int id)
        {
            var applicationUser = await _context.ApplicationUser.FindAsync(id);

            if (applicationUser == null)
            {
                return NotFound();
            }

            return applicationUser;
        }

        // PUT: api/ApplicationUser/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/token/{token}")]
        public async Task<IActionResult> PutApplicationUser(int id,string token, ApplicationUser applicationUser)
        {
             var user = await _context.Users.FirstOrDefaultAsync(e => e.Token == token);
             if(user.Id == 0){
                 return BadRequest();
             }
            if (id != applicationUser.Id && user.Id != applicationUser.UserId)
            {
                return BadRequest();
            }

            _context.Entry(applicationUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
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

        // POST: api/ApplicationUser
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("token/{token}")]
        public async Task<ActionResult<ApplicationUser>> PostApplicationUser(string token,ApplicationUser applicationUser)
        {
             var user = await _context.Users.FirstOrDefaultAsync(e => e.Token == token);
             if(user.Id == 0){
                 return BadRequest();
             }
            var app = await _context.Applications.FirstOrDefaultAsync(e => e.Id ==  applicationUser.ApplicationId );

            applicationUser.UserId = user.Id;
            applicationUser.Version = app.version;
            _context.ApplicationUser.Add(applicationUser);
            if (ApplicationUserExists(user.Id,applicationUser.ApplicationId))
                {
                    return BadRequest();
                }
               
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        }

        // DELETE: api/ApplicationUser/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationUser(int id)
        {
            var applicationUser = await _context.ApplicationUser.FindAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }

            _context.ApplicationUser.Remove(applicationUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApplicationUserExists(int id)
        {
            return _context.ApplicationUser.Any(e => e.Id == id);
        }
        private bool ApplicationUserExists(int UserId,int ApplicationId)
        {
            return _context.ApplicationUser.Any(e => e.UserId == UserId && e.ApplicationId == ApplicationId );
        }
    }
}
