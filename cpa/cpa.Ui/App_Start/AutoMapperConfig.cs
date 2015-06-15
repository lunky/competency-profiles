using AutoMapper;
using cpa.Model;
using cpa.Shared.dtos;

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

			Mapper.CreateMap<Model.Profile, ProfileDto>();
			Mapper.CreateMap<ProfileDto, ProfileModel>();
			Mapper.CreateMap<ProfileModel, ProfileDto>();

			Mapper.CreateMap<CompetencyLevel, CompetencyLevelDto>().ReverseMap();
			Mapper.CreateMap<CompetencyLevelDto, CompetencyLevelModel>().ReverseMap();
		}
	}
}