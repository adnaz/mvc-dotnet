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
    public class ApplicationsController : ControllerBase
    {
        private readonly UserContext _context;

        public ApplicationsController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Applications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            return await _context.Applications.ToListAsync();
        }
        // GET: api/Applications/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Application>>> SearchApplications(string search)
        {
            return await _context.Applications.Where(h=>h.Name.Contains(search)).ToListAsync();
        }
        [HttpGet("own")]
        public async Task<ActionResult<IEnumerable<Application>>> OwnedApplications(string token)
        {
            
            var user = await _context.Users.FirstOrDefaultAsync(e => e.Token == token);
            return await _context.Applications.Where(h=>h.UserId == user.Id).ToListAsync();

            
        }

        // GET: api/Applications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            var application = await _context.Applications.FindAsync(id);

            if (application == null)
            {
                return NotFound();
            }

            return application;
        }
       

        // PUT: api/Applications/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/token/{token}")]
        public async Task<IActionResult> PutApplication(int id,string token, Application application)
        {
             var user = await _context.Users.FirstOrDefaultAsync(e => e.Token == token);
            application.UserId = user.Id;
            if (id != application.Id && application.UserId != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(application).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationExists(id))
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

        // POST: api/Applications
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("token/{token}")]
        public async Task<ActionResult<Application>> PostApplication(string token ,Application application)
        {
            var user = await _context.Users.FirstOrDefaultAsync(e => e.Token == token);
            application.UserId = user.Id;
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplication", new { id = application.Id }, application);
        }

        // DELETE: api/Applications/5
        [HttpDelete("{id}/token/{token}")]
        public async Task<IActionResult> DeleteApplication(int id,string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(e => e.Token == token);
            var application = await _context.Applications.FindAsync(id);
            if(application.UserId == user.Id){
                 _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
            }
            if (application == null)
            {
                return NotFound();
            }

           

            return NoContent();
        }

        private bool ApplicationExists(int id)
        {
            return _context.Applications.Any(e => e.Id == id);
        }
    }
}
