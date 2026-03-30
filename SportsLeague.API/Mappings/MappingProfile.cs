
using AutoMapper;
using SportsLeague.API.DTOs.Request;
using SportsLeague.API.DTOs.Response;
using SportsLeague.Domain.Entities;

namespace SportsLeague.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // ── Team ──────────────────────────────────────────────────────
        CreateMap<TeamRequestDTO, Team>();
        CreateMap<Team, TeamResponseDTO>();

        // ── Player ────────────────────────────────────────────────────
        CreateMap<PlayerRequestDTO, Player>();
        CreateMap<Player, PlayerResponseDTO>()
            .ForMember(dest => dest.TeamName,
                       opt => opt.MapFrom(src => src.Team != null ? src.Team.Name : string.Empty));

        // ── Referee ───────────────────────────────────────────────────
        CreateMap<RefereeRequestDTO, Referee>();
        CreateMap<Referee, RefereeResponseDTO>();

        // ── Tournament ────────────────────────────────────────────────
        CreateMap<TournamentRequestDTO, Tournament>();
        CreateMap<Tournament, TournamentResponseDTO>();

        // ── Sponsor ───────────────────────────────────────────────────
        CreateMap<SponsorRequestDTO, Sponsor>();
        CreateMap<Sponsor, SponsorResponseDTO>();

        // ── TournamentSponsor ─────────────────────────────────────────
        CreateMap<TournamentSponsorRequestDTO, TournamentSponsor>()
            .ForMember(dest => dest.JoinedAt,
                       opt => opt.MapFrom(_ => DateTime.UtcNow));

        // -------------------------------------------------------------- //

        CreateMap<TournamentSponsor, TournamentSponsorResponseDTO>()
            .ForMember(dest => dest.TournamentName,
                       opt => opt.MapFrom(src => src.Tournament != null
                                                  ? src.Tournament.Name
                                                  : string.Empty))
            .ForMember(dest => dest.SponsorName,
                       opt => opt.MapFrom(src => src.Sponsor != null
                                                  ? src.Sponsor.Name
                                                  : string.Empty));
    }
}

// -------------------------------------------------------------- //