using System.Net.Http.Json;
using MiniCRM.API.Models;

namespace MiniCRM.API.Services;

public class EnderecoService
{
    private readonly HttpClient _http;

    public EnderecoService(HttpClient http)
    {
        _http = http;
    }

    public async Task<Endereco> CriarPorCepAsync(string cep)
    {
        var url = $"https://viacep.com.br/ws/{cep}/json/";
        var response = await _http.GetFromJsonAsync<ViaCepResponse>(url);

        if (response == null || !string.IsNullOrEmpty(response.Erro))
            throw new Exception("CEP inválido");

        return new Endereco
        {
            Cep = cep,
            Logradouro = response.Logradouro,
            Bairro = response.Bairro,
            Localidade = response.Localidade,
            Uf = response.Uf,
            Complemento = response.Complemento
        };
    }

    private class ViaCepResponse
    {
        public string Cep { get; set; } = null!;
        public string Logradouro { get; set; } = null!;
        public string Complemento { get; set; } = null!;
        public string Bairro { get; set; } = null!;
        public string Localidade { get; set; } = null!;
        public string Uf { get; set; } = null!;
        public string Erro { get; set; } = null!;
    }
}
