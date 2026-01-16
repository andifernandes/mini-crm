namespace MiniCRM.API.Models;

public class Endereco
{
    public Guid Id { get; set; }

    public string Cep { get; set; } = null!;
    public string Logradouro { get; set; } = null!;
    public string Bairro { get; set; } = null!;
    public string Localidade { get; set; } = null!;
    public string Uf { get; set; } = null!;

    public string? Complemento { get; set; }
}
