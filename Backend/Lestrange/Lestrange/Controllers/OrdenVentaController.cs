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
    public class OrdenVentaController : ControllerBase
    {
        private readonly LestrangeContext _context;

        public OrdenVentaController(LestrangeContext context)
        {
            _context = context;
        }

        // GET: api/OrdenVenta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdenVenta>>> GetOrdenVenta()
        {
          if (_context.OrdenVenta == null)
          {
              return NotFound();
          }
            return await _context.OrdenVenta.ToListAsync();
        }

        // GET: api/OrdenVenta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdenVenta>> GetOrdenVenta(int id)
        {
          if (_context.OrdenVenta == null)
          {
              return NotFound();
          }
            var ordenVenta = await _context.OrdenVenta.FindAsync(id);

            if (ordenVenta == null)
            {
                return NotFound();
            }

            return ordenVenta;
        }

        // PUT: api/OrdenVenta/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdenVenta(int id, OrdenVenta ordenVenta)
        {
            if (id != ordenVenta.Id)
            {
                return BadRequest();
            }

            _context.Entry(ordenVenta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdenVentaExists(id))
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

        // POST: api/OrdenVenta
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrdenVenta>> PostOrdenVenta(OrdenVenta ordenVenta)
        {
          if (_context.OrdenVenta == null)
          {
              return Problem("Entity set 'LestrangeContext.OrdenVenta'  is null.");
          }
            _context.OrdenVenta.Add(ordenVenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdenVenta", new { id = ordenVenta.Id }, ordenVenta);
        }

        // DELETE: api/OrdenVenta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdenVenta(int id)
        {
            if (_context.OrdenVenta == null)
            {
                return NotFound();
            }
            var ordenVenta = await _context.OrdenVenta.FindAsync(id);
            if (ordenVenta == null)
            {
                return NotFound();
            }

            _context.OrdenVenta.Remove(ordenVenta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrdenVentaExists(int id)
        {
            return (_context.OrdenVenta?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
