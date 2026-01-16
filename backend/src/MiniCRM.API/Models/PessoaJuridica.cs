namespace MiniCRM.API.Models;

public class PessoaJuridica
{
    public Guid Id { get; set; }
    public string RazaoSocial { get; set; } = null!;
    public string Cnpj { get; set; } = null!;
    public string? Telefone { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public Guid EnderecoId { get; set; }
    public Endereco? Endereco { get; set; }
}
