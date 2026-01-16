namespace MiniCRM.API.Models;

public class PessoaFisica
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Cpf { get; set; } = null!;
    public DateTime DataNascimento { get; set; }
    public Guid EnderecoId { get; set; }
    public Endereco? Endereco { get; set; }
}
