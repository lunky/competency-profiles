using System.Data.Entity;
using cpa.Model;

namespace cpa.EntityFramework
{
	public interface ICpaContext: IUnitOfWork
	{
		IDbSet<Objective> Objectives { get; set; }
		IDbSet<Profile> Profiles { get; set; }
		IDbSet<CompetencyLevel> CompetencyLevels { get; set; }
	}
}