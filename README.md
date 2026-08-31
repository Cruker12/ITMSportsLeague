<div align="center">

# 🏆 Sports League API · Gestión de Ligas Deportivas

</div>

<div align="center">

<img src="https://img.shields.io/badge/.NET%208-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" />
<img src="https://img.shields.io/badge/C%23%2012-68217A?style=for-the-badge&logo=csharp&logoColor=white" />
<img src="https://img.shields.io/badge/Entity%20Framework%20Core%208-5C2D91?style=for-the-badge&logo=.net&logoColor=white" />
<img src="https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white" />
<img src="https://img.shields.io/badge/Swagger-API%20Documentation-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />

<br/>
<br/>

<img src="https://img.shields.io/badge/Architecture-Clean%20Architecture-0A192F?style=flat-square" />
<img src="https://img.shields.io/badge/Status-Active%20Development-success?style=flat-square" />
<img src="https://img.shields.io/badge/License-Academic-lightgrey?style=flat-square" />

</div>


## 🎯 Objetivo del Proyecto

Construir una API REST robusta que modele el comportamiento real de una liga deportiva mediante:

- Arquitectura N-Capas desacoplada
- Patrón Repository + Service Layer
- Máquina de estados para el ciclo de vida de los partidos
- Validaciones de negocio cruzadas
- DTOs con AutoMapper
- Datos calculados en tiempo real con LINQ
- Manejo global de excepciones con middleware
- Paginación en listados principales

---

## 🏛️ Arquitectura

```
┌──────────────────────────────────────────────────┐
│               SportsLeague.API                   │
│   Controllers · DTOs · Mappings · Middlewares    │
│                     · Swagger                    │
└─────────────────────┬────────────────────────────┘
                      │  referencia
┌─────────────────────▼────────────────────────────┐
│             SportsLeague.Domain                  │
│  Entities · Enums · DTOs · Interfaces · Services │
│                    · Helpers                     │
└─────────────────────┬────────────────────────────┘
                      │  referencia
┌─────────────────────▼────────────────────────────┐
│           SportsLeague.DataAccess                │
│    DbContext · Repositories · Migrations         │
│    Seeders                                       │
└──────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> `SportsLeague.Domain` **no referencia** a ningún otro proyecto. Define interfaces (contratos) que las demás capas implementan.

### Flujo de una petición HTTP

```
HTTP Request
     │
     ▼
ExceptionHandlingMiddleware  → Captura excepciones globalmente
     │
     ▼
Controller (API)             → Recibe DTO, valida modelo
     │
     ▼
Service (Domain)             → Ejecuta lógica y validaciones de negocio
     │
     ▼
Repository (DataAccess)      → Queries con EF Core
     │
     ▼
SQL Server
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| ASP.NET Core  | Framework web y capa REST |
| Entity Framework Core  | ORM Code First |
| SQL Server | Base de datos relacional |
| AutoMapper | Mapeo Entity ↔ DTO |
| Swagger / Swashbuckle | Documentación y pruebas interactivas |

---

## 📂 Estructura del Proyecto

```
SportsLeague/
│
├── SportsLeague.API/
│   ├── Controllers/
│   ├── DTOs/
│   │   ├── Request/
│   │   └── Response/
│   ├── Mappings/
│   ├── Middlewares/
│   │   └── ExceptionHandlingMiddleware.cs
│   └── Program.cs
│
├── SportsLeague.Domain/
│   ├── DTOs/
│   ├── Entities/
│   ├── Enums/
│   ├── Interfaces/
│   │   ├── Repositories/
│   │   └── Services/
│   ├── Services/
│   └── Helpers/
│
└── SportsLeague.DataAccess/
    ├── Context/
    ├── Repositories/
    ├── Seeders/
    └── Migrations/
```

---

## 🧩 Módulos del Sistema

### 👥 Equipos y Jugadores
- CRUD completo de equipos con ciudad y estadio
- CRUD de jugadores vinculados a un equipo
- Posiciones definidas por enum: `Goalkeeper`, `Defender`, `Midfielder`, `Forward`
- Consulta de jugadores filtrada por equipo
- Paginación en listados de equipos, jugadores y árbitros

---

### 🏟️ Torneos y Árbitros
- Gestión de torneos con fechas de inicio y fin
- Estados de torneo: `Pending` · `InProgress` · `Finished`
- Inscripción y desinscripción de equipos (relación N:M con índice único)
- CRUD de árbitros con nacionalidad
- Paginación en listados de torneos

---

### ⚽ Partidos — Máquina de Estados
- Creación de partidos con equipo local, visitante, árbitro y torneo
- Control de estados con transiciones estrictas:

```
Scheduled ──► InProgress ──► Finished
    │              │
    └──► Suspended ◄┘
```

> [!WARNING]
> No se permite retroceder de estado ni saltar pasos. La transición se realiza vía `PATCH /api/match/{id}/status` con un body `{ "status": 1 }`.

---

### 📋 Eventos de Partido
- Registro de **goles** con tipo (`Normal`, `OwnGoal`, `Penalty`) y minuto
- Registro de **tarjetas** con tipo (`Yellow`, `Red`) y minuto
- **Resultado final** (relación 1:1 con el partido)
- Solo se permite registrar eventos en partidos `InProgress` o `Finished`

---

### 📊 Tabla de Posiciones y Estadísticas
- Tabla de posiciones calculada en **tiempo real** con LINQ (no almacenada)
- Criterios de desempate: puntos → diferencia de gol → goles a favor
- Ranking de goleadores por torneo
- Ranking de tarjetas por torneo
- Tipado fuerte con DTOs concretos (`StandingDTO`, `TopScorerDTO`, `CardStatsDTO`)

> [!TIP]
> Al calcular en tiempo real, la tabla siempre refleja el estado actual sin riesgo de inconsistencias.

---

### 📋 Alineaciones *(En desarrollo)*
- Registro de jugadores convocados para un partido
- Distinción entre titulares (`IsStarter: true`) y suplentes (`IsStarter: false`)
- Máximo 11 titulares por equipo por partido
- Solo permitido en partidos `Scheduled`

---

## 🔧 Mejoras de Calidad (Fase Actual)

### ExceptionHandlingMiddleware
- Manejo global de excepciones sin try/catch en controllers
- `KeyNotFoundException` → HTTP 404
- `InvalidOperationException` → HTTP 400
- Excepciones no controladas → HTTP 500 con log

### Paginación
- Listados de Teams, Players, Referees, Tournaments y Matches soportan paginación
- Parámetros: `?page=1&pageSize=10` (valores por defecto)
- Respuesta envuelta en `PagedResultDTO<T>` con metadatos: `TotalCount`, `TotalPages`, `HasPrevious`, `HasNext`

### Tipado fuerte en Standings
- `IStandingsService` retorna `List<StandingDTO>`, `List<TopScorerDTO>`, `List<CardStatsDTO>`
- Eliminación de tipos `object` y anonymous types en el servicio

---

## 🌐 Endpoints

### Teams *(paginado)*

```
GET    /api/team?page=1&pageSize=10     Listar equipos (paginado)
GET    /api/team/{id}                   Obtener equipo
POST   /api/team                        Crear equipo
PUT    /api/team/{id}                   Actualizar equipo
DELETE /api/team/{id}                   Eliminar equipo
```

### Players *(paginado)*

```
GET    /api/player?page=1&pageSize=10   Listar jugadores (paginado)
GET    /api/player/{id}                 Obtener jugador
GET    /api/player/team/{teamId}        Jugadores de un equipo
POST   /api/player                      Crear jugador
PUT    /api/player/{id}                 Actualizar jugador
DELETE /api/player/{id}                 Eliminar jugador
```

### Referees *(paginado)*

```
GET    /api/referee?page=1&pageSize=10  Listar árbitros (paginado)
GET    /api/referee/{id}                Obtener árbitro
POST   /api/referee                     Crear árbitro
PUT    /api/referee/{id}                Actualizar árbitro
DELETE /api/referee/{id}                Eliminar árbitro
```

### Tournaments *(paginado)*

```
GET    /api/tournament?page=1&pageSize=10               Listar torneos (paginado)
GET    /api/tournament/{id}                             Obtener torneo
POST   /api/tournament                                  Crear torneo
PUT    /api/tournament/{id}                             Actualizar torneo
DELETE /api/tournament/{id}                             Eliminar torneo
PATCH  /api/tournament/{id}/status                      Cambiar estado
POST   /api/tournament/{id}/teams                       Inscribir equipo
GET    /api/tournament/{id}/teams                       Equipos inscritos
```

### Matches *(paginado)*

```
GET    /api/match/tournament/{tournamentId}?page=1&pageSize=10   Listar partidos por torneo (paginado)
GET    /api/match/{id}                                           Obtener partido
POST   /api/match                                                Crear partido → Scheduled
PUT    /api/match/{id}                                           Actualizar partido
DELETE /api/match/{id}                                           Eliminar partido
PATCH  /api/match/{id}/status                                    Cambiar estado del partido
```

> [!NOTE]
> Para cambiar el estado del partido, enviar `PATCH /api/match/{id}/status` con body `{ "status": 1 }` donde los valores son: `0=Scheduled`, `1=InProgress`, `2=Finished`, `3=Suspended`.

### Match Events

```
POST   /api/match/{matchId}/goals           Registrar gol
GET    /api/match/{matchId}/goals           Goles del partido
DELETE /api/match/{matchId}/goals/{goalId}  Eliminar gol
POST   /api/match/{matchId}/cards           Registrar tarjeta
GET    /api/match/{matchId}/cards           Tarjetas del partido
DELETE /api/match/{matchId}/cards/{cardId}  Eliminar tarjeta
POST   /api/match/{matchId}/result          Registrar resultado final
GET    /api/match/{matchId}/result          Resultado del partido
```

### Standings

```
GET    /api/standings?tournamentId=1                    Tabla de posiciones
GET    /api/stats/scorers?tournamentId=1               Ranking goleadores
GET    /api/stats/cards?tournamentId=1                  Ranking tarjetas
```

### Match Lineup *(En desarrollo)*

```
POST   /api/match/{matchId}/lineup              Agregar jugador a alineación
GET    /api/match/{matchId}/lineup              Alineación completa del partido
GET    /api/match/{matchId}/lineup/team/{id}    Alineación por equipo
DELETE /api/match/{matchId}/lineup/{id}         Eliminar jugador de alineación
```

### Infrastructure

```
GET    /health                                  Health check de la API
GET    /swagger                                 Documentación Swagger UI
```

---

## ✅ Reglas de Negocio

| Contexto | Regla |
|----------|-------|
| Jugador | Debe pertenecer a un equipo existente |
| Jugador | Número de camiseta único por equipo |
| Inscripción | Un equipo no puede inscribirse dos veces en el mismo torneo |
| Torneo | Solo se pueden editar/eliminar torneos en estado `Pending` |
| Torneo | Solo se pueden inscribir equipos en torneos `Pending` |
| Partido | HomeTeam y AwayTeam no pueden ser el mismo equipo |
| Partido | Ambos equipos deben estar inscritos en el torneo |
| Partido | Solo se pueden crear partidos en torneos `InProgress` |
| Partido | Solo se pueden editar/eliminar partidos `Scheduled` |
| Estado | No se permite retroceder ni saltar estados |
| Eventos | Solo se registran en partidos `InProgress` o `Finished` |
| Eventos | El jugador debe pertenecer a uno de los dos equipos del partido |
| Alineación | Solo se registra en partidos `Scheduled` |
| Alineación | Máximo 11 titulares por equipo por partido |
| Alineación | Un jugador no puede aparecer dos veces en la misma alineación |
| Patrocinador | Nombre único a nivel de base de datos |
| Patrocinador | Email con formato válido |
| Patrocinador | Un patrocinador no puede vincularse dos veces al mismo torneo |

---

## 🌱 Data Seeder

Al iniciar la API con la base de datos vacía, se cargan automáticamente los siguientes datos:

| Entidad | Cantidad | Detalle |
|---------|----------|---------|
| Equipos | 20 | Todos los equipos reales de la Liga BetPlay 2026 |
| Jugadores | 80 | 4 por equipo con posiciones variadas |
| Árbitros | 4 | Árbitros colombianos |
| Torneos | 1 | Liga BetPlay 2026-I en estado `InProgress` |
| Inscripciones | 20 | Todos los equipos inscritos al torneo |

> [!NOTE]
> La ejecución es **idempotente**: si ya existen datos en la base, el Seeder no hace nada.

---

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/[usuario]/SportsLeagueAPI.git
cd SportsLeagueAPI
```

### 2️⃣ Configurar la cadena de conexión

En `SportsLeague.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SportsLeagueDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3️⃣ Aplicar migraciones

```bash
dotnet ef database update `
  --project SportsLeague.DataAccess `
  --startup-project SportsLeague.API
```

### 4️⃣ Ejecutar la API

```bash
dotnet run --project SportsLeague.API
```

### 5️⃣ Abrir Swagger

```
https://localhost:{puerto}/swagger
```

> [!TIP]
> Los datos del Seeder se crean automáticamente en el primer arranque. No se necesita configuración manual.

---

## 📊 Estado del Proyecto

<div align="center">

| Módulo | Estado |
|--------|--------|
| Teams, Players, Referees | ✅ Completo |
| Tournaments + Inscripciones | ✅ Completo |
| Matches + Máquina de estados | ✅ Completo |
| Goals, Cards, MatchResult | ✅ Completo |
| Standings y Estadísticas | ✅ Completo |
| Sponsors + Patrocinio | ✅ Completo |
| Data Seeder | ✅ Completo |
| Exception Handling Middleware | ✅ Completo |
| Paginación en listados | ✅ Completo |
| Tipado fuerte en Standings | ✅ Completo |
| Match Lineup (Alineaciones) | 🚧 En desarrollo |

</div>

---

## 📋 Changelog — Fase: Calidad, Robustez y Estabilidad

### Agregado
- `ExceptionHandlingMiddleware` para manejo global de excepciones
- Paginación en endpoints de Teams, Players, Referees, Tournaments y Matches
- DTOs tipados en Domain: `StandingDTO`, `TopScorerDTO`, `CardStatsDTO`
- Método `GetCountAsync()` en repositorio genérico
- Métodos `GetAllPagedAsync()` y `GetCountByTournamentAsync()` en repositorios
- Endpoint `GET /health` para verificación de salud de la API

### Cambiado
- `IStandingsService` ahora retorna tipos concretos en lugar de `object`
- `IStandingsService.GetStandingsAsync()` retorna `Task<List<StandingDTO>>`
- `IStandingsService.GetTopScorersAsync()` retorna `Task<List<TopScorerDTO>>`
- `IStandingsService.GetCardStatsAsync()` retorna `Task<List<CardStatsDTO>>`
- Todos los controllers limpiados de bloques try/catch redundantes
- Estados de torneo en README: `Upcoming` → `Pending` (corregido)
- Diagrama de estados de partido: `Cancelled` → `Suspended` (corregido)
- Endpoints de Matches: corregidos para reflejar `PATCH /status`
- Endpoints de Standings: ahora usan query params `?tournamentId=`
- README actualizado con documentación completa de la fase

### Corregido
- Nombre de archivo `Tournament..cs` → `Tournament.cs` (doble punto eliminado)
- Discrepancia entre README y código en estados de torneo y partido
- Documentación de endpoints desactualizada

---

<div align="center">

### 🏆 Sports League API · Gestión de Ligas Deportivas

**.NET · Entity Framework Core · SQL Server · Arquitectura N-Capas**

**Programación Web — ITM 2026**

</div>
