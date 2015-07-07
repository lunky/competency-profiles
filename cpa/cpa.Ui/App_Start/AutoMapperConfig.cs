using AutoMapper;
using cpa.Model;
using cpa.Shared.dtos;
using cpa.Ui.Models;
using Profile = cpa.Model.Profile;

namespace cpa.Ui
{
    public static class AutoMapperConfig
    {
        public static void ConfigureMappings()
        {
            Mapper.CreateMap<Objective, ObjectiveDto>().ReverseMap();
            Mapper.CreateMap<ObjectiveDto, ObjectiveModel>()
                .ForMember(dest => dest.GateLevel, opt => opt.MapFrom(src => src.GateLevel.ToString()))
                .ReverseMap();

            Mapper.CreateMap<Profile, ProfileDto>()
                .ForMember(d => d.MetObjectives, o => o.MapFrom(x => x.Objectives));

            Mapper.CreateMap<ProfileObjective, ObjectiveDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Objective.Id))
                .ForMember(d => d.Evidence, o => o.MapFrom(s => s.Evidence))
                .ForMember(d => d.Communication, o => o.MapFrom(s => s.Objective.Communication))
                .ForMember(d => d.Leadership, o => o.MapFrom(s => s.Objective.Leadership))
                .ForMember(d => d.Interpersonal, o => o.MapFrom(s => s.Objective.Interpersonal))
                .ForMember(d => d.Conflict, o => o.MapFrom(s => s.Objective.Conflict))
                .ForMember(d => d.Citizenship, o => o.MapFrom(s => s.Objective.Citizenship))
                .ForMember(d => d.Score, o => o.MapFrom(s => s.Objective.Score))
                .ForMember(d => d.GateLevel, o => o.MapFrom(s => s.Objective.GateLevel))
                .ForMember(d => d.CompetencyWeighting, o => o.MapFrom(s => s.Objective.CompetencyWeighting))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Objective.Description))
                .ForMember(d => d.SupportingExample, o => o.MapFrom(s => s.Objective.SupportingExample))
                .ForMember(d => d.CounterExample, o => o.MapFrom(s => s.Objective.CounterExample));

            Mapper.CreateMap<ProfileDto, ProfileModel>();
            Mapper.CreateMap<ProfileModel, ProfileDto>();

            Mapper.CreateMap<CompetencyLevel, CompetencyLevelDto>().ReverseMap();
            Mapper.CreateMap<CompetencyLevelDto, CompetencyLevelModel>().ReverseMap();

            Mapper.CreateMap<UserAccessDto, UserAccessModel>();

            Mapper.CreateMap<ProfileObjectiveModel, ProfileObjectiveDto>();
        }
    }
}