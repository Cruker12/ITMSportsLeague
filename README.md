# 🏆 Sports League API

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

---

## 🏛️ Arquitectura

```
┌──────────────────────────────────────────────────┐
│               SportsLeague.API                   │
│      Controllers · DTOs · Mappings · Swagger     │
└─────────────────────┬────────────────────────────┘
                      │  referencia
┌─────────────────────▼────────────────────────────┐
│             SportsLeague.Domain                  │
│     Entities · Enums · Interfaces · Services     │
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
Controller (API)        → Recibe DTO, valida modelo
     │
     ▼
Service (Domain)        → Ejecuta lógica y validaciones de negocio
     │
     ▼
Repository (DataAccess) → Queries con EF Core
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
│   └── Program.cs
│
├── SportsLeague.Domain/
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

---

### 🏟️ Torneos y Árbitros
- Gestión de torneos con fechas de inicio y fin
- Estados de torneo: `Upcoming` · `InProgress` · `Finished`
- Inscripción y desinscripción de equipos (relación N:M con índice único)
- CRUD de árbitros con nacionalidad

---

### ⚽ Partidos — Máquina de Estados
- Creación de partidos con equipo local, visitante, árbitro y torneo
- Control de estados con transiciones estrictas:

```
Scheduled ──► InProgress ──► Finished
    └─────────────────────► Cancelled
```

> [!WARNING]
> No se permite retroceder de estado ni saltar pasos. Cada transición tiene su propio endpoint.

---

### 📋 Eventos de Partido
- Registro de **goles** con tipo (`Normal`, `OwnGoal`, `Penalty`) y minuto
- Registro de **tarjetas** con tipo (`Yellow`, `Red`, `YellowRed`) y minuto
- **Resultado final** (relación 1:1 con el partido)
- Solo se permite registrar eventos en partidos `InProgress`

---

### 📊 Tabla de Posiciones y Estadísticas
- Tabla de posiciones calculada en **tiempo real** con LINQ (no almacenada)
- Criterios de desempate: puntos → diferencia de gol → goles a favor
- Ranking de goleadores por torneo
- Ranking de tarjetas por torneo

> [!TIP]
> Al calcular en tiempo real, la tabla siempre refleja el estado actual sin riesgo de inconsistencias.

---

### 📋 Alineaciones 
- Registro de jugadores convocados para un partido
- Distinción entre titulares (`IsStarter: true`) y suplentes (`IsStarter: false`)
- Máximo 11 titulares por equipo por partido
- Solo permitido en partidos `Scheduled`

---


## 🌐 Endpoints

### Teams · Players · Referees

```
GET    /api/team                            Listar equipos
GET    /api/team/{id}                       Obtener equipo
POST   /api/team                            Crear equipo
PUT    /api/team/{id}                       Actualizar equipo
DELETE /api/team/{id}                       Eliminar equipo

GET    /api/player                          Listar jugadores (paginado)
GET    /api/player/{id}                     Obtener jugador
GET    /api/player/team/{teamId}            Jugadores de un equipo
POST   /api/player                          Crear jugador
PUT    /api/player/{id}                     Actualizar jugador
DELETE /api/player/{id}                     Eliminar jugador

GET    /api/referee                         Listar árbitros
GET    /api/referee/{id}                    Obtener árbitro
POST   /api/referee                         Crear árbitro
PUT    /api/referee/{id}                    Actualizar árbitro
DELETE /api/referee/{id}                    Eliminar árbitro
```

### Tournaments

```
GET    /api/tournament                      Listar torneos
GET    /api/tournament/{id}                 Obtener torneo
POST   /api/tournament                      Crear torneo
PUT    /api/tournament/{id}                 Actualizar torneo
DELETE /api/tournament/{id}                 Eliminar torneo
POST   /api/tournament/{id}/teams           Inscribir equipo
DELETE /api/tournament/{id}/teams/{teamId}  Desinscribir equipo
```

### Matches

```
GET    /api/match                           Listar partidos
GET    /api/match/{id}                      Obtener partido
POST   /api/match                           Crear partido → Scheduled
PUT    /api/match/{id}/start                Iniciar partido → InProgress
PUT    /api/match/{id}/finish               Finalizar partido → Finished
PUT    /api/match/{id}/cancel               Cancelar partido → Cancelled
```

### Match Events

```
POST   /api/match/{id}/goals                Registrar gol
GET    /api/match/{id}/goals                Goles del partido
POST   /api/match/{id}/cards                Registrar tarjeta
GET    /api/match/{id}/cards                Tarjetas del partido
POST   /api/match/{id}/result               Registrar resultado final
GET    /api/match/{id}/result               Resultado del partido
```

### Standings

```
GET    /api/standings/{tournamentId}            Tabla de posiciones
GET    /api/standings/{tournamentId}/scorers    Ranking goleadores
GET    /api/standings/{tournamentId}/cards      Ranking tarjetas
```

### Match Lineup *(En desarrollo)*

```
POST   /api/match/{matchId}/lineup              Agregar jugador a alineación
GET    /api/match/{matchId}/lineup              Alineación completa del partido
GET    /api/match/{matchId}/lineup/team/{id}    Alineación por equipo
DELETE /api/match/{matchId}/lineup/{id}         Eliminar jugador de alineación
```

---

## ✅ Reglas de Negocio

| Contexto | Regla |
|----------|-------|
| Jugador | Debe pertenecer a un equipo existente |
| Inscripción | Un equipo no puede inscribirse dos veces en el mismo torneo |
| Partido | HomeTeam y AwayTeam no pueden ser el mismo equipo |
| Partido | Ambos equipos deben estar inscritos en el torneo |
| Estado | No se permite retroceder ni saltar estados |
| Eventos | Solo se registran en partidos `InProgress` |
| Eventos | El jugador debe pertenecer a uno de los dos equipos del partido |
| Alineación | Solo se registra en partidos `Scheduled` |
| Alineación | Máximo 11 titulares por equipo por partido |
| Alineación | Un jugador no puede aparecer dos veces en la misma alineación |

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
| Partidos | 1 | Partido de prueba en estado `Scheduled` |

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
dotnet ef database update \
  --project SportsLeague.DataAccess \
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

| Módulo | Estado |
|--------|--------|
| Teams, Players, Referees | ✅ Completo |
| Tournaments + Inscripciones | ✅ Completo |
| Matches + Máquina de estados | ✅ Completo |
| Goals, Cards, MatchResult | ✅ Completo |
| Standings y Estadísticas | ✅ Completo |
| Data Seeder | ✅ Completo |
| Match Lineup (Alineaciones) | 🚧 En desarrollo |



<div align="center">

### 🏆 Sports League API · Gestión de Ligas Deportivas

**.NET · Entity Framework Core · SQL Server · Arquitectura N-Capas**

**Programación Web — ITM 2026**

</div>
