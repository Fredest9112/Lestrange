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
    public class PagoController : ControllerBase
    {
        private readonly LestrangeContext _context;

        public PagoController(LestrangeContext context)
        {
            _context = context;
        }

        // GET: api/Pago
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pago>>> GetPagos()
        {
          if (_context.Pagos == null)
          {
              return NotFound();
          }
            return await _context.Pagos.ToListAsync();
        }

        // GET: api/Pago/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pago>> GetPago(int id)
        {
          if (_context.Pagos == null)
          {
              return NotFound();
          }
            var pago = await _context.Pagos.FindAsync(id);

            if (pago == null)
            {
                return NotFound();
            }

            return pago;
        }

        // PUT: api/Pago/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPago(int id, Pago pago)
        {
            if (id != pago.Id)
            {
                return BadRequest();
            }

            _context.Entry(pago).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PagoExists(id))
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

        // POST: api/Pago
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pago>> PostPago(Pago pago)
        {
          if (_context.Pagos == null)
          {
              return Problem("Entity set 'LestrangeContext.Pagos'  is null.");
          }
            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPago", new { id = pago.Id }, pago);
        }

        // DELETE: api/Pago/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePago(int id)
        {
            if (_context.Pagos == null)
            {
                return NotFound();
            }
            var pago = await _context.Pagos.FindAsync(id);
            if (pago == null)
            {
                return NotFound();
            }

            _context.Pagos.Remove(pago);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PagoExists(int id)
        {
            return (_context.Pagos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
