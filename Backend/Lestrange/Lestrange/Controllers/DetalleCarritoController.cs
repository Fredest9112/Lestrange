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
    public class DetalleCarritoController : ControllerBase
    {
        private readonly LestrangeContext _context;

        public DetalleCarritoController(LestrangeContext context)
        {
            _context = context;
        }

        // GET: api/DetalleCarrito
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleCarrito>>> GetDetalleCarritos()
        {
          if (_context.DetalleCarritos == null)
          {
              return NotFound();
          }
            return await _context.DetalleCarritos.ToListAsync();
        }

        // GET: api/DetalleCarrito/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleCarrito>> GetDetalleCarrito(int id)
        {
          if (_context.DetalleCarritos == null)
          {
              return NotFound();
          }
            var detalleCarrito = await _context.DetalleCarritos.FindAsync(id);

            if (detalleCarrito == null)
            {
                return NotFound();
            }

            return detalleCarrito;
        }

        // PUT: api/DetalleCarrito/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleCarrito(int id, DetalleCarrito detalleCarrito)
        {
            if (id != detalleCarrito.Id)
            {
                return BadRequest();
            }

            _context.Entry(detalleCarrito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleCarritoExists(id))
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

        // POST: api/DetalleCarrito
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DetalleCarrito>> PostDetalleCarrito(DetalleCarrito detalleCarrito)
        {
          if (_context.DetalleCarritos == null)
          {
              return Problem("Entity set 'LestrangeContext.DetalleCarritos'  is null.");
          }
            _context.DetalleCarritos.Add(detalleCarrito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetalleCarrito", new { id = detalleCarrito.Id }, detalleCarrito);
        }

        // DELETE: api/DetalleCarrito/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleCarrito(int id)
        {
            if (_context.DetalleCarritos == null)
            {
                return NotFound();
            }
            var detalleCarrito = await _context.DetalleCarritos.FindAsync(id);
            if (detalleCarrito == null)
            {
                return NotFound();
            }

            _context.DetalleCarritos.Remove(detalleCarrito);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetalleCarritoExists(int id)
        {
            return (_context.DetalleCarritos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
