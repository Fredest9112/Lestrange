using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lestrange.Models;

namespace Lestrange.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZapatoController : ControllerBase
    {
        private readonly LestrangeContext _context;

        public ZapatoController(LestrangeContext context)
        {
            _context = context;
        }

        // GET: api/Zapato
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zapato>>> GetZapatos()
        {
          if (_context.Zapatos == null)
          {
              return NotFound();
          }
            return await _context.Zapatos.ToListAsync();
        }

        // GET: api/Zapato/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Zapato>> GetZapato(int id)
        {
          if (_context.Zapatos == null)
          {
              return NotFound();
          }
            var zapato = await _context.Zapatos.FindAsync(id);

            if (zapato == null)
            {
                return NotFound();
            }

            return zapato;
        }

        // PUT: api/Zapato/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZapato(int id, Zapato zapato)
        {
            if (id != zapato.Id)
            {
                return BadRequest();
            }

            _context.Entry(zapato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZapatoExists(id))
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

        // POST: api/Zapato
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Zapato>> PostZapato(Zapato zapato)
        {
          if (_context.Zapatos == null)
          {
              return Problem("Entity set 'LestrangeContext.Zapatos'  is null.");
          }
            _context.Zapatos.Add(zapato);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZapato", new { id = zapato.Id }, zapato);
        }

        // DELETE: api/Zapato/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZapato(int id)
        {
            if (_context.Zapatos == null)
            {
                return NotFound();
            }
            var zapato = await _context.Zapatos.FindAsync(id);
            if (zapato == null)
            {
                return NotFound();
            }

            _context.Zapatos.Remove(zapato);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ZapatoExists(int id)
        {
            return (_context.Zapatos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
