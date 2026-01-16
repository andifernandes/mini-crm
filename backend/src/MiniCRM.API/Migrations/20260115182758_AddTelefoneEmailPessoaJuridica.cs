using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiniCRM.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTelefoneEmailPessoaJuridica : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "PessoasJuridicas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "PessoasJuridicas",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "PessoasJuridicas");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "PessoasJuridicas");
        }
    }
}
