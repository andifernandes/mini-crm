using MiniCRM.API.Entities;
using Microsoft.EntityFrameworkCore;
using MiniCRM.API.Models;
namespace MiniCRM.API.Context;

public class InMemoryAppDbContext(DbContextOptions<InMemoryAppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Endereco> Enderecos { get; set; }
    public DbSet<PessoaFisica> PessoasFisicas { get; set; }
    public DbSet<PessoaJuridica> PessoasJuridicas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.Name).HasMaxLength(100);
            entity.Property(u => u.Email).HasMaxLength(256);
            entity.Property(u => u.PasswordHash).HasMaxLength(256);
            entity.Property(u => u.RefreshToken).HasMaxLength(512);
        });
        
        modelBuilder.Entity<User>().HasData(
            new User(
                name: "Admin",
                email: "admin@admin.com",
                passwordHash: "$2a$11$h6UcM3ZVSZHP35jUbL874ejPEhewHMc/CoF95/HTQ19qE.YijWVRC" // This is a hashed password for "admin1234" using SHA256
            )
            {
                Id = 1
            }
        );
    }
}