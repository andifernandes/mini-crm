using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniCRM.API.Context;
using MiniCRM.API.Models;
using MiniCRM.API.Services;

namespace MiniCRM.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EnderecosController : ControllerBase
{
    private readonly InMemoryAppDbContext _context;
    private readonly EnderecoService _enderecoService;

    // Construtor com injeção de dependência correta
    public EnderecosController(InMemoryAppDbContext context, EnderecoService enderecoService)
    {
        _context = context;
        _enderecoService = enderecoService;
    }

    // GET: api/Enderecos/consulta/{cep} - Consulta CEP via ViaCEP
    [HttpGet("consulta/{cep}")]
    public async Task<ActionResult<Endereco>> ConsultarCep(string cep)
    {
        try
        {
            var endereco = await _enderecoService.CriarPorCepAsync(cep);
            return Ok(endereco);
        }
        catch
        {
            return BadRequest("CEP inválido");
        }
    }

    // GET: api/Enderecos - Lista todos os endereços
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Endereco>>> GetAll()
    {
        var enderecos = await _context.Enderecos.ToListAsync();
        return Ok(enderecos);
    }

    // GET: api/Enderecos/{id} - Busca endereço por Id
    [HttpGet("{id}")]
    public async Task<ActionResult<Endereco>> GetById(Guid id)
    {
        var endereco = await _context.Enderecos.FindAsync(id);
        if (endereco == null) return NotFound();
        return Ok(endereco);
    }

    // POST: api/Enderecos - Cria novo endereço
    [HttpPost]
    public async Task<ActionResult<Endereco>> Create(Endereco endereco)
    {
        _context.Enderecos.Add(endereco);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = endereco.Id }, endereco);
    }

    // PUT: api/Enderecos/{id} - Atualiza endereço existente
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Endereco endereco)
    {
        if (id != endereco.Id) return BadRequest();

        _context.Entry(endereco).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EnderecoExists(id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE: api/Enderecos/{id} - Remove endereço
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var endereco = await _context.Enderecos.FindAsync(id);
        if (endereco == null) return NotFound();

        _context.Enderecos.Remove(endereco);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Verifica se endereço existe
    private bool EnderecoExists(Guid id)
    {
        return _context.Enderecos.Any(e => e.Id == id);
    }
}
