using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniCRM.API.Context;
using MiniCRM.API.Models;

namespace MiniCRM.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PessoaJuridicaController(InMemoryAppDbContext context) : ControllerBase
{
    private readonly InMemoryAppDbContext _context = context;

    // GET: api/PessoaJuridica
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaJuridica>>> GetAll()
        => await _context.PessoasJuridicas.Include(p => p.Endereco).ToListAsync();

    // GET: api/PessoaJuridica/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PessoaJuridica>> GetById(Guid id)
    {
        var pessoa = await _context.PessoasJuridicas.Include(p => p.Endereco)
                                                    .FirstOrDefaultAsync(p => p.Id == id);
        return pessoa == null ? NotFound() : pessoa;
    }

    // POST: api/PessoaJuridica
    [HttpPost]
    public async Task<ActionResult<PessoaJuridica>> Create(PessoaJuridica pessoa)
    {
        _context.PessoasJuridicas.Add(pessoa);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
    }

    // PUT: api/PessoaJuridica/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, PessoaJuridica pessoa)
    {
        if (id != pessoa.Id) return BadRequest();
        _context.Entry(pessoa).State = EntityState.Modified;

        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException)
        {
            if (!PessoaExists(id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE: api/PessoaJuridica/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var pessoa = await _context.PessoasJuridicas.FindAsync(id);
        if (pessoa == null) return NotFound();

        _context.PessoasJuridicas.Remove(pessoa);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool PessoaExists(Guid id)
        => _context.PessoasJuridicas.Any(e => e.Id == id);
}
