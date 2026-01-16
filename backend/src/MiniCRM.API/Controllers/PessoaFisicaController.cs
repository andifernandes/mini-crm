using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniCRM.API.Context;
using MiniCRM.API.Models;

namespace MiniCRM.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PessoaFisicaController(InMemoryAppDbContext context) : ControllerBase
{
    private readonly InMemoryAppDbContext _context = context;

    // GET: api/PessoaFisica
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaFisica>>> GetAll()
        => await _context.PessoasFisicas.Include(p => p.Endereco).ToListAsync();

    // GET: api/PessoaFisica/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PessoaFisica>> GetById(Guid id)
    {
        var pessoa = await _context.PessoasFisicas.Include(p => p.Endereco)
                                                  .FirstOrDefaultAsync(p => p.Id == id);
        return pessoa == null ? NotFound() : pessoa;
    }

    // POST: api/PessoaFisica
    [HttpPost]
    public async Task<ActionResult<PessoaFisica>> Create(PessoaFisica pessoa)
    {
        pessoa.DataNascimento = DateTime.SpecifyKind(
            pessoa.DataNascimento,
            DateTimeKind.Utc
        );

        _context.PessoasFisicas.Add(pessoa);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
    }

    // PUT: api/PessoaFisica/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, PessoaFisica pessoa)
    {
        if (id != pessoa.Id)
            return BadRequest("Id da URL diferente do body");

        var existente = await _context.PessoasFisicas
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (existente == null)
            return NotFound();

        // IMPORTANTE: garantir Kind correto se ainda for DateTime
        pessoa.DataNascimento = DateTime.SpecifyKind(
            pessoa.DataNascimento,
            DateTimeKind.Utc
        );

        _context.Entry(pessoa).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }


    // DELETE: api/PessoaFisica/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var pessoa = await _context.PessoasFisicas.FindAsync(id);
        if (pessoa == null) return NotFound();

        _context.PessoasFisicas.Remove(pessoa);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool PessoaExists(Guid id)
        => _context.PessoasFisicas.Any(e => e.Id == id);
}
