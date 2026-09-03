# Ejecucion — ITM Sports League

## Requisitos

- .NET SDK 10.0+
- SQL Server 2019+
- Node.js 18+ (solo para frontend)

## Paso 1 — Clonar

```bash
git clone [repo-url]
cd ITMSportsLeague
```

## Paso 2 — Configurar base de datos

Editar `SportsLeague.API/appsettings.json` con tu cadena de conexion:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SportsLeagueDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

## Paso 3 — Restaurar y compilar

```bash
dotnet restore
dotnet build
```

## Paso 4 — Compilar frontend

```bash
cd SportsLeague.API/SportsLeague.Frontend
npm install
npm run build
cd ../..
```

Los archivos se generan en `SportsLeague.API/wwwroot/`.

## Paso 5 — Ejecutar

```bash
dotnet run --project SportsLeague.API
```

## Paso 6 — Abrir en el navegador

| Servicio | URL |
|----------|-----|
| Aplicacion completa | http://localhost:5262 |
| Swagger | http://localhost:5262/swagger |
| Health check | http://localhost:5262/health |

> El Data Seeder carga 20 equipos, 80 jugadores, 6 arbitros y 1 torneo automaticamente en el primer arranque.

## Modo desarrollo (hot reload)

**Terminal 1 — API:**
```bash
dotnet run --project SportsLeague.API
```

**Terminal 2 — Frontend:**
```bash
cd SportsLeague.API/SportsLeague.Frontend
npm run dev
```

| Servicio | URL |
|----------|-----|
| API | http://localhost:5262 |
| Frontend dev | http://localhost:3000 |
