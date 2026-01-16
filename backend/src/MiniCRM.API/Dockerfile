# Dockerfile para build dentro de src/MiniCRM.API

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Exponha a porta 5000 onde a app vai escutar
EXPOSE 5000

# Configura a aplicação para escutar em http://+:5000 (todas as interfaces na porta 5000)
ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copia só o arquivo de projeto para acelerar o restore
COPY ["MiniCRM.API.csproj", "./"]
RUN dotnet restore "./MiniCRM.API.csproj"

# Copia o restante dos arquivos do projeto
COPY . .

# Build do projeto
RUN dotnet build "./MiniCRM.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./MiniCRM.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

# Copia arquivos publicados para a imagem final
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "MiniCRM.API.dll"]
